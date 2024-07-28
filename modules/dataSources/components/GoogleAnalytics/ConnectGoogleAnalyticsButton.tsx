// modules/dataSources/components/GoogleAnalytics/ConnectGoogleAnalyticsButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ConnectGoogleAnalyticsButton() {
  const [authUrl, setAuthUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/google-analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthUrl(data.authUrl);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <a href={authUrl}>
        <Button disabled={loading || !authUrl}>
          Connect to Google Analytics
        </Button>
      </a>
    </div>
  );
}

export default ConnectGoogleAnalyticsButton;
