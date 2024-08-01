"use client";

import { useContext } from "react";
import { DataSourceContext } from "@/context/DataSourceContext";
import LoadingButton from "@/modules/common/LoadingButton";
import { disconnectGADataSource } from "@/actions/datasource";

const DisconnectGoogleAnalyticsButton = () => {
  const { fetchDataSources, setIsConnected } = useContext(DataSourceContext);

  const handleDisconnect = async () => {
    const deletedDSC = await disconnectGADataSource();

    if (deletedDSC) {
      setIsConnected(false);
      await fetchDataSources();
    }
  };

  return (
    <form action={handleDisconnect}>
      <LoadingButton
        variant="destructive"
        defaultText="Disconnect"
        loadingText="Disconnecting..."
      />
    </form>
  );
};

export default DisconnectGoogleAnalyticsButton;
