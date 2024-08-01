"use client";

import { useEffect, useState } from "react";
import { getAuthUrl } from "@/actions/datasource";
import { Button } from "@/components/ui/button";

function ConnectGoogleAnalyticsButton() {
  const [authUrl, setAuthUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateAuthUrl = async () => {
    setLoading(true);
    const authUrl = await getAuthUrl();
    setLoading(false);

    if (authUrl) {
      setAuthUrl(authUrl);
    }
  };

  useEffect(() => {
    generateAuthUrl();
  }, []);

  return (
    <a href={authUrl}>
      <Button disabled={loading || !authUrl}>
        Connect to Google Analytics
      </Button>
    </a>
  );
}

export default ConnectGoogleAnalyticsButton;
