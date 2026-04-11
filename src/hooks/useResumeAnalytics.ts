import { useEffect } from "react";

import {
  initializeResumeAnalyticsTransport,
  trackResumePageView,
  trackResumeScrollDepth,
  trackResumeSectionView,
  type ResumeSectionName,
} from "@/lib/analytics";

const scrollThresholds = [25, 50, 75, 90] as const;
const sectionSelector = "[data-analytics-section]";

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
}
