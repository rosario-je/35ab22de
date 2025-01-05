import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

import { getCallList, resetAllCallStatus, updateCall } from "../API";

const ContextProvider = ({ children }) => {
  /*--------State variables used in application-------*/
  const [selectedPage, setSelectedPage] = useState("Inbox");
  const [callList, setCallList] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  /*--------Fetch call list and filter out archived and unarchived calls-------*/
  useEffect(() => {
    const fetchCallList = async () => {
      try {
        const callData = await getCallList();

        const archivedCallsData = [];
        const unarchivedCallsData = [];

        callData.forEach((call) => {
          if (call.is_archived) {
            archivedCallsData.push(call);
          } else {
            unarchivedCallsData.push(call);
          }
        });

        setArchivedCalls(archivedCallsData);
        setCallList(unarchivedCallsData);
      } catch (error) {
        console.error("Failed to fetch call data:", error);
      }
    };

    fetchCallList();
  }, [setCallList, setArchivedCalls]);

  /*--------Archive all calls that are not archived-------*/
  const handleArchiveAll = async () => {
    for (const call of callList) {
      try {
        setLoading(true);
        const updatedCall = await updateCall(call.id, {
          is_archived: true,
        });
        setLoading(false);

        console.log(`Updated call ${call.id}:`, updatedCall);
      } catch (error) {
        console.error(`Failed to update call ${call.id}:`, error);
      }
    }

    const callData = await getCallList();
    setCallList(callData);

    const archivedCallsData = callData.filter(
      (call) => call.is_archived === "true"
    );
    setArchivedCalls(archivedCallsData);
  };
  /*--------Reset all calls to original state (unarchive all alls)-------*/
  const handleCallReset = async () => {
    try {
      await resetAllCallStatus();
      const callData = await getCallList();
      setCallList(callData);
      setArchivedCalls([]);
      console.log("Call status reset successfully");
    } catch (error) {
      console.error("Failed to reset call status:", error);
    }
  };

  const providerValue = {
    selectedPage,
    setSelectedPage,
    handlePageClick,
    callList,
    setCallList,
    archivedCalls,
    setArchivedCalls,
    handleArchiveAll,
    handleCallReset,
    loading,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
