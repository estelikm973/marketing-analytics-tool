"use server";

import { sendGAEvent } from "@next/third-parties/google";

export const triggerTestEvent = () => {
  sendGAEvent({ event: "buttonClicked", value: "xyz" });
};
