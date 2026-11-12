"use client";

import { useEffect } from "react";
import { getLeadAttribution } from "@/lib/browser-attribution";

export default function AttributionCapture() {
  useEffect(() => {
    getLeadAttribution();
  }, []);
  return null;
}
