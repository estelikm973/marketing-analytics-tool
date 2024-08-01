"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getGAPropertyAccount, updateGAProperty } from "@/actions/datasource";
import { Button } from "@/components/ui/button";
import AccountSelect from "./AccountSelect";
import PropertySelect from "./PropertySelect";
import { DataSourceContext } from "@/context/DataSourceContext";

export interface IAccount {
  displayName: string;
  name: string;
}

const PropertyForm = () => {
  const router = useRouter();

  const { closeDialog } = useContext(DataSourceContext);
  const [accountName, setAccountName] = useState("");
  const [propertyName, setPropertyName] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const saveProperty = async () => {
    if (!propertyName || !accountName) return;

    setSubmitLoading(true);
    const newId = await updateGAProperty(accountName, propertyName);
    setSubmitLoading(false);

    if (newId) {
      closeDialog();
      router.refresh();
    }
  };

  const fetchPropertyAccount = async () => {
    setLoading(true);
    const res = await getGAPropertyAccount();
    setLoading(false);

    if (res) {
      const { account_name, property_name } = res;
      setAccountName(account_name);
      setPropertyName(property_name);
    }
  };

  useEffect(() => {
    fetchPropertyAccount();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center text-gray-700">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex-grow space-y-4">
        <div>
          <div className="mb-1 text-xs font-medium text-gray-700">Account</div>
          <AccountSelect
            accountName={accountName}
            setAccountName={setAccountName}
          />
        </div>
        {accountName && (
          <div>
            <div className="mb-1 text-xs font-medium text-gray-700">
              Property
            </div>
            <PropertySelect
              accountName={accountName}
              propertyName={propertyName}
              setPropertyName={setPropertyName}
            />
          </div>
        )}
        <Button
          size="sm"
          className="w-full"
          disabled={submitLoading}
          type="button"
          onClick={saveProperty}
        >
          {submitLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PropertyForm;
