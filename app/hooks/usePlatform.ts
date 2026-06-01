"use client";

import { useState, useEffect } from "react";

export type Platform = "windows" | "mac" | "linux";

export function usePlatform() {
  // Default to windows for SSR to prevent hydration mismatch, 
  // or default to something generic. Windows is the most common desktop OS.
  const [platform, setPlatform] = useState<Platform>("windows");

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setPlatform("mac");
    } else if (userAgent.includes("linux") && !userAgent.includes("android")) {
      setPlatform("linux");
    } else {
      setPlatform("windows");
    }
  }, []);

  return platform;
}
