import { useEffect } from "react";

import {
  initializeResumeAnalyticsTransport,
  resumeTimeOnPageThresholds,
  trackResumePageView,
  trackResumeScrollDepth,
  trackResumeSectionView,
  trackResumeTimeOnPage,
  type ResumeSectionName,
} from "@/lib/analytics";

const scrollThresholds = [25, 50, 75, 90] as const;
const sectionSelector = "[data-analytics-section]";
const maxTimeOnPageThreshold =
  resumeTimeOnPageThresholds[resumeTimeOnPageThresholds.length - 1];

const timeOnPageState = {
  activeInstances: 0,
  intervalId: null as number | null,
  visibleElapsedMs: 0,
  visibleStartedAt: null as number | null,
};

function getScrollDepth() {
  const doc = document.documentElement;
  const viewportHeight = window.innerHeight;
  const scrollHeight = doc.scrollHeight;
  const maxScrollable = scrollHeight - viewportHeight;

  if (maxScrollable <= 0) {
    return 100;
  }

  const viewedHeight = window.scrollY + viewportHeight;
  return Math.min(100, Math.round((viewedHeight / scrollHeight) * 100));
}

function getVisibleElapsedMs() {
  if (timeOnPageState.visibleStartedAt === null) {
    return timeOnPageState.visibleElapsedMs;
  }

  return (
    timeOnPageState.visibleElapsedMs +
    (Date.now() - timeOnPageState.visibleStartedAt)
  );
}

function stopTimeOnPageInterval() {
  if (timeOnPageState.intervalId === null) {
    return;
  }

  window.clearInterval(timeOnPageState.intervalId);
  timeOnPageState.intervalId = null;
}

function emitTimeOnPageThresholds() {
  const visibleElapsedSeconds = Math.floor(getVisibleElapsedMs() / 1000);

  resumeTimeOnPageThresholds.forEach((threshold) => {
    if (visibleElapsedSeconds >= threshold) {
      trackResumeTimeOnPage(threshold);
    }
  });

  if (visibleElapsedSeconds >= maxTimeOnPageThreshold) {
    stopTimeOnPageInterval();
  }
}

function pauseVisibleTimeTracking() {
  if (timeOnPageState.visibleStartedAt !== null) {
    timeOnPageState.visibleElapsedMs +=
      Date.now() - timeOnPageState.visibleStartedAt;
    timeOnPageState.visibleStartedAt = null;
  }

  emitTimeOnPageThresholds();
  stopTimeOnPageInterval();
}

function startVisibleTimeTracking() {
  if (document.visibilityState !== "visible") {
    return;
  }

  if (timeOnPageState.visibleStartedAt === null) {
    timeOnPageState.visibleStartedAt = Date.now();
  }

  emitTimeOnPageThresholds();

  if (
    timeOnPageState.intervalId !== null ||
    Math.floor(getVisibleElapsedMs() / 1000) >= maxTimeOnPageThreshold
  ) {
    return;
  }

  timeOnPageState.intervalId = window.setInterval(() => {
    emitTimeOnPageThresholds();
  }, 1000);
}

function syncVisibleTimeTracking() {
  if (document.visibilityState === "visible") {
    startVisibleTimeTracking();
    return;
  }

  pauseVisibleTimeTracking();
}

export function useResumeAnalytics() {
  useEffect(() => {
    initializeResumeAnalyticsTransport();
    trackResumePageView();

    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>(sectionSelector),
    );

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const sectionName = (entry.target as HTMLElement).dataset
              .analyticsSection as ResumeSectionName | undefined;

            if (sectionName) {
              trackResumeSectionView(sectionName);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -15% 0px",
          threshold: 0.35,
        },
      );

      sectionElements.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
      };
    }

    sectionElements.forEach((element) => {
      const sectionName = element.dataset.analyticsSection as
        | ResumeSectionName
        | undefined;

      if (sectionName) {
        trackResumeSectionView(sectionName);
      }
    });

    return undefined;
  }, []);

  useEffect(() => {
    const emitScrollDepth = () => {
      const depth = getScrollDepth();

      scrollThresholds.forEach((threshold) => {
        if (depth >= threshold) {
          trackResumeScrollDepth(threshold);
        }
      });
    };

    emitScrollDepth();

    window.addEventListener("scroll", emitScrollDepth, { passive: true });
    window.addEventListener("resize", emitScrollDepth);

    return () => {
      window.removeEventListener("scroll", emitScrollDepth);
      window.removeEventListener("resize", emitScrollDepth);
    };
  }, []);

  useEffect(() => {
    timeOnPageState.activeInstances += 1;

    if (timeOnPageState.activeInstances === 1) {
      syncVisibleTimeTracking();
      document.addEventListener("visibilitychange", syncVisibleTimeTracking);
    }

    return () => {
      timeOnPageState.activeInstances = Math.max(
        0,
        timeOnPageState.activeInstances - 1,
      );

      if (timeOnPageState.activeInstances === 0) {
        document.removeEventListener(
          "visibilitychange",
          syncVisibleTimeTracking,
        );
        pauseVisibleTimeTracking();
      }
    };
  }, []);
}
