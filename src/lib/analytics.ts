type AnalyticsTransport = "gtm" | "ga4" | "off";

export type ResumeSectionName =
  | "summary"
  | "experience"
  | "education"
  | "additional_education"
  | "skills";

export type ResumeContactMethod = "email" | "whatsapp" | "linkedin";

export const resumeTimeOnPageThresholds = [30, 60, 120, 300, 600] as const;

export type ResumeTimeOnPageThreshold =
  (typeof resumeTimeOnPageThresholds)[number];

type ResumeEventName =
  | "resume_page_view"
  | "resume_section_view"
  | "resume_email_modal_open"
  | "resume_contact_click"
  | "resume_print_click"
  | "resume_scroll_depth"
  | "resume_time_on_page_30s"
  | "resume_time_on_page_60s"
  | "resume_time_on_page_120s"
  | "resume_time_on_page_300s"
  | "resume_time_on_page_600s";

type ResumeAnalyticsEvent = {
  event: "resume_event";
  event_name: ResumeEventName;
  page_type: "resume";
  section_name?: ResumeSectionName | "header";
  contact_method?: ResumeContactMethod;
  placement?: string;
  scroll_depth?: number;
  scroll_bucket?: string;
};

type ResumeAnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __RESUME_DISABLE_ANALYTICS__?: boolean;
  __resumeAnalyticsTransport?: AnalyticsTransport;
};

const gtmId = import.meta.env.VITE_GTM_ID?.trim() ?? "";
const ga4MeasurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? "";

let initialized = false;
let transport: AnalyticsTransport = "off";

const pageViewSent = { current: false };
const seenSections = new Set<ResumeSectionName>();
const seenScrollDepths = new Set<number>();
const seenTimeOnPageThresholds = new Set<ResumeTimeOnPageThreshold>();

const timeOnPageEventNameByThreshold: Record<
  ResumeTimeOnPageThreshold,
  ResumeEventName
> = {
  30: "resume_time_on_page_30s",
  60: "resume_time_on_page_60s",
  120: "resume_time_on_page_120s",
  300: "resume_time_on_page_300s",
  600: "resume_time_on_page_600s",
};

function getResumeWindow() {
  return window as ResumeAnalyticsWindow;
}

function isAnalyticsDisabled() {
  if (typeof window === "undefined") {
    return true;
  }

  const resumeWindow = getResumeWindow();

  if (resumeWindow.__RESUME_DISABLE_ANALYTICS__) {
    return true;
  }

  return new URLSearchParams(window.location.search).has("disable_tracking");
}

function ensureDataLayer() {
  const resumeWindow = getResumeWindow();

  resumeWindow.dataLayer = resumeWindow.dataLayer ?? [];
  return resumeWindow.dataLayer;
}

function injectScriptOnce(scriptId: string, src: string) {
  if (document.getElementById(scriptId)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.id = scriptId;
  script.src = src;
  document.head.appendChild(script);
}

function setupGtm() {
  transport = "gtm";
  const resumeWindow = getResumeWindow();

  ensureDataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
  resumeWindow.__resumeAnalyticsTransport = transport;
  injectScriptOnce(
    `resume-gtm-${gtmId}`,
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
  );
}

function setupGa4Fallback() {
  transport = "ga4";
  const resumeWindow = getResumeWindow();
  const dataLayer = ensureDataLayer();

  resumeWindow.gtag =
    resumeWindow.gtag ??
    ((...args: unknown[]) => {
      dataLayer.push(args);
    });

  resumeWindow.gtag("js", new Date());
  resumeWindow.gtag("config", ga4MeasurementId, {
    send_page_view: false,
  });
  resumeWindow.__resumeAnalyticsTransport = transport;
  injectScriptOnce(
    `resume-ga4-${ga4MeasurementId}`,
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4MeasurementId)}`,
  );
}

function emitResumeEvent(event: ResumeAnalyticsEvent) {
  if (typeof window === "undefined" || transport === "off" || isAnalyticsDisabled()) {
    return;
  }

  if (transport === "gtm") {
    ensureDataLayer().push(event);
    return;
  }

  if (transport === "ga4") {
    const resumeWindow = getResumeWindow();
    const { event: _event, event_name, ...params } = event;

    resumeWindow.gtag?.("event", event_name, {
      ...params,
      event_name,
    });
  }
}

export function initializeResumeAnalyticsTransport() {
  if (typeof window === "undefined" || initialized) {
    return;
  }

  initialized = true;

  if (isAnalyticsDisabled()) {
    transport = "off";
    getResumeWindow().__resumeAnalyticsTransport = transport;
    return;
  }

  if (gtmId) {
    setupGtm();
    return;
  }

  if (ga4MeasurementId) {
    setupGa4Fallback();
    return;
  }

  transport = "off";
  getResumeWindow().__resumeAnalyticsTransport = transport;
}

export function trackResumePageView() {
  if (pageViewSent.current) {
    return;
  }

  pageViewSent.current = true;
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_page_view",
    page_type: "resume",
    placement: "page_load",
  });
}

export function trackResumeSectionView(sectionName: ResumeSectionName) {
  if (seenSections.has(sectionName)) {
    return;
  }

  seenSections.add(sectionName);
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_section_view",
    page_type: "resume",
    section_name: sectionName,
    placement: "section_observer",
  });
}

export function trackResumeEmailModalOpen() {
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_email_modal_open",
    page_type: "resume",
    section_name: "header",
    placement: "email_modal_open",
  });
}

export function trackResumeContactClick(
  contactMethod: ResumeContactMethod,
  placement = "contact_chip",
) {
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_contact_click",
    page_type: "resume",
    section_name: "header",
    contact_method: contactMethod,
    placement,
  });
}

export function trackResumePrintClick() {
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_print_click",
    page_type: "resume",
    placement: "floating_action",
  });
}

export function trackResumeScrollDepth(scrollDepth: 25 | 50 | 75 | 90) {
  if (seenScrollDepths.has(scrollDepth)) {
    return;
  }

  seenScrollDepths.add(scrollDepth);
  emitResumeEvent({
    event: "resume_event",
    event_name: "resume_scroll_depth",
    page_type: "resume",
    scroll_depth: scrollDepth,
    scroll_bucket: `${scrollDepth}%`,
    placement: "page_scroll",
  });
}

export function trackResumeTimeOnPage(
  thresholdSeconds: ResumeTimeOnPageThreshold,
) {
  if (seenTimeOnPageThresholds.has(thresholdSeconds)) {
    return;
  }

  seenTimeOnPageThresholds.add(thresholdSeconds);
  emitResumeEvent({
    event: "resume_event",
    event_name: timeOnPageEventNameByThreshold[thresholdSeconds],
    page_type: "resume",
  });
}
