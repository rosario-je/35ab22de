import React, { useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { getCallList, updateCall, resetAllCallStatus } from "../API"; // Import updateCall
import { formatDate } from "../Helpers/DateFunction.js";

// Icons
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoArchiveOutline } from "react-icons/io5";

const CallList = () => {
  const {
    selectedPage,
    callList,
    setCallList,
    archivedCalls,
    setArchivedCalls,
    handleArchiveAll,
    handleCallReset,
  } = useContext(AppContext);

  console.log("this is the callList", callList);
  console.log("this is the archivedCalls", archivedCalls);

  /*--------Sort all the calls by date-------*/
  const sortedCallList = callList.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  //Filter the callList based on page for inbount calls and all calls
  const filteredCallList = callList.filter((call) => {
    if (selectedPage === "Inbox") {
      return call.direction === "inbound";
    }
    return true;
  });

  return (
    <>
      {selectedPage === "Archived" && archivedCalls.length > 0 ? (
        <button className="archive-all-button" onClick={handleCallReset}>
          <IoArchiveOutline size={24} />
          <h2>Unarchive all calls</h2>
        </button>
      ) : (
        selectedPage !== "Archived" &&
        callList.length > 0 && (
          <button className="archive-all-button" onClick={handleArchiveAll}>
            <IoArchiveOutline size={24} />
            <h2>Archive all calls</h2>
          </button>
        )
      )}

      <div className="call-list">
        {selectedPage === "Archived" ? (
          archivedCalls.length > 0 ? (
            archivedCalls.map((call) => (
              <div key={call.id} className="call-container">
                <div className="call-icon">
                  {call.direction === "inbound" ? (
                    <BsFillTelephoneInboundFill size={20} />
                  ) : (
                    <BsFillTelephoneOutboundFill size={20} />
                  )}
                </div>
                <div className="call-details">
                  <h2>+{call.from}</h2>
                  <div className="call-action">
                    <p className="call-date">{formatDate(call.created_at)}</p>
                    <IoInformationCircleSharp size={20} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No archived calls to display</p>
          )
        ) : // If not on "Archived" page, exclude archived calls
        filteredCallList.length > 0 ? (
          filteredCallList
            .filter((call) => call.is_archived !== "true")
            .map((call) => (
              <div key={call.id} className="call-container">
                <div className="call-icon">
                  {call.direction === "inbound" ? (
                    <BsFillTelephoneInboundFill size={20} />
                  ) : (
                    <BsFillTelephoneOutboundFill size={20} />
                  )}
                </div>
                <div className="call-details">
                  <h2>+{call.from}</h2>
                  <div className="call-action">
                    <p className="call-date">{formatDate(call.created_at)}</p>
                    <IoInformationCircleSharp size={20} />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No calls to display</p>
        )}
      </div>
    </>
  );
};

export default CallList;
