"use client";

import { useSyncExternalStore } from "react";

const mobileQuery = "(max-width: 1023px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMobileLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
