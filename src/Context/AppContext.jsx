import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

import { getCallList, resetAllCallStatus, updateCall } from "../API";

const ContextProvider = ({ children }) => {
  /*--------State variables used in application-------*/
  const [selectedPage, setSelectedPage] = useState("Inbox");
  const [callList, setCallList] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("archivedCalls", archivedCalls);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  /*--------Fetch call list and filter out archived and unarchived calls-------*/
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
  useEffect(() => {
    fetchCallList();
  }, [setCallList, setArchivedCalls]);

  /*--------Archive all calls that are not archived-------*/
  const handleArchiveAll = async () => {
    setLoading(true);

    try {
      const updatedCalls = [];

      for (const call of callList) {
        const updatedCall = await updateCall(call.id, {
          is_archived: true,
        });
        updatedCalls.push(updatedCall);
      }

      // After archiving, filter archived and unarchived calls
      const callData = await getCallList();
      const archivedCallsData = callData.filter(
        (call) => call.is_archived === "true"
      );
      const unarchivedCallsData = callData.filter(
        (call) => call.is_archived !== "true"
      );

      // Update both callList and archivedCalls state
      setCallList([]);
      setArchivedCalls(callData);

      console.log("All calls archived successfully");
    } catch (error) {
      console.error("Failed to archive calls:", error);
    } finally {
      setLoading(false);
    }
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
    setLoading,
    fetchCallList,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
