"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function EventButton() {
  return (
    <div>
      <button
        className="border py-3 px-5"
        onClick={() => sendGAEvent({ event: "buttonClick", value: "xyz" })}
      >
        Test Event
      </button>
    </div>
  );
}
