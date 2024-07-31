// modules/dataSources/components/GoogleAnalytics/ConnectGoogleAnalyticsButton.tsx
"use client";

import { getAuthUrl } from "@/actions/datasource";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import PropertyIdTooltip from "./PropertyIdTooltip";
import { Input } from "@/components/ui/input";
import { getUserId } from "@/actions/auth";

function ConnectGoogleAnalyticsButton() {
  const [authUrl, setAuthUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyId, setPropertyId] = useState("");
  const [userId, setUserId] = useState("");

  const fetchUserId = async () => {
    setLoading(true);
    const userId = await getUserId();
    setLoading(false);

    if (userId) setUserId(userId);
  };

  const generateAuthUrl = useCallback(
    async (user_id: string, property_id: string) => {
      if (!user_id) return;

      const authUrl = await getAuthUrl({ user_id, property_id });

      if (authUrl) {
        setAuthUrl(authUrl);
      }
    },
    []
  );

  useEffect(() => {
    generateAuthUrl(userId, propertyId);
  }, [propertyId, userId, generateAuthUrl]);

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <div>
      <div className="flex-grow space-y-3 mb-4">
        <div className="flex gap-2 items-center">
          <Label htmlFor="ga-property-id">Property ID:</Label>
          <PropertyIdTooltip />
        </div>
        <Input
          id="ga-property-id"
          type="text"
          placeholder="ex: 845983413"
          value={propertyId}
          onChange={(e) => setPropertyId(e.currentTarget.value)}
        />
      </div>
      <a href={authUrl}>
        <Button disabled={loading || !authUrl}>
          Connect to Google Analytics
        </Button>
      </a>
    </div>
  );
}

export default ConnectGoogleAnalyticsButton;
