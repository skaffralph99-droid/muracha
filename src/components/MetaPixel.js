'use client';
import { useEffect } from "react";

// Paste your Meta Pixel ID here (Events Manager → Data Sources → your pixel → ID).
export const PIXEL_ID = "1061885703492101";

const active = () => PIXEL_ID && PIXEL_ID !== "YOUR_PIXEL_ID";

// Safe event helper — does nothing until the pixel is loaded.
export function track(event, data) {
  try {
    if (typeof window !== "undefined" && window.fbq) window.fbq("track", event, data || {});
  } catch (e) {}
}

export default function MetaPixel() {
  useEffect(() => {
    if (!active() || window.fbq) return;
    const n = (window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }, []);
  return null;
}
