"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getGAPropertyId, updateGAPropertyId } from "@/actions/datasource";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PropertyIdTooltip from "./PropertyIdTooltip";

const SavePropertyIdForm = () => {
  const router = useRouter();

  const [propertyId, setPropertyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(false);

  const savePropertyId = async () => {
    if (!propertyId) return;

    setLoading(true);
    const newId = await updateGAPropertyId(propertyId).finally(() =>
      setLoading(false)
    );

    if (newId) {
      router.refresh();
    }
  };

  const fetchPropertyId = async () => {
    setPropertyLoading(true);
    const propertyId = await getGAPropertyId().finally(() =>
      setPropertyLoading(false)
    );

    if (propertyId) {
      setPropertyId(propertyId);
    }
  };

  useEffect(() => {
    fetchPropertyId();
  }, []);

  if (propertyLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex-grow space-y-2">
        <div className="flex gap-2 items-center">
          <Label htmlFor="ga-property-id">Property ID:</Label>
          <PropertyIdTooltip />
        </div>
        <Input
          id="ga-property-id"
          type="text"
          placeholder="ex: 845983413"
          required
          value={propertyId}
          onChange={(e) => setPropertyId(e.currentTarget.value)}
        />
      </div>
      <Button disabled={loading} type="button" onClick={savePropertyId}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>Save</>
        )}
      </Button>
    </div>
  );
};

export default SavePropertyIdForm;
