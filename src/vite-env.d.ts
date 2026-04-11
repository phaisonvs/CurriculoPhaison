/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
  readonly VITE_GA4_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __RESUME_DISABLE_ANALYTICS__?: boolean;
    __resumeAnalyticsTransport?: "gtm" | "ga4" | "off";
  }
}

export {};
