"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function EventButton() {
  return (
    <div>
      <button
        onClick={() => sendGAEvent({ event: "click", value: "xyz" })}
      >
        Send Event
      </button>
    </div>
  );
}
