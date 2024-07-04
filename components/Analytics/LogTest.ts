"use client";

import { useEffect } from "react";
import { analytics } from "@/libs/firebase";
import { logEvent } from "firebase/analytics";

const LogTest = () => {
  useEffect(() => {
    logEvent(analytics, "test_event");
  }, []);

  return null;
};

export default LogTest;
