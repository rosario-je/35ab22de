import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { formatDate } from "../Helpers/DateFunction.js";

// Icons
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoArchiveOutline } from "react-icons/io5";
import CallDetailsModal from "./CallDetailsModal.jsx";

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

  const [selectedCall, setSelectedCall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort and filter calls based on selected page
  const sortedCallList = callList.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  const filteredCallList = callList.filter((call) => {
    if (selectedPage === "Inbox") {
      return call.direction === "inbound";
    }
    return true;
  });

  // Function to handle modal open
  const handleOpenModal = (call) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {selectedPage === "Archived" && archivedCalls.length > 0 ? (
        <button className="archive-all-button pb-4" onClick={handleCallReset}>
          <h2>Unarchive all calls</h2>
        </button>
      ) : (
        selectedPage !== "Archived" &&
        callList.length > 0 && (
          <button
            className="archive-all-button pb-4"
            onClick={handleArchiveAll}
          >
            <h2>Archive all calls</h2>
          </button>
        )
      )}

      <div className="call-list overflow-y-auto scrollbar-hidden max-h-[400px]">
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
                    <IoInformationCircleSharp
                      size={20}
                      onClick={() => handleOpenModal(call)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No archived calls to display</p>
          )
        ) : filteredCallList.length > 0 ? (
          filteredCallList
            .filter((call) => call.is_archived !== "true")
            .map((call) => (
              <div key={call.id} className="call-container ">
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
                    <IoInformationCircleSharp
                      size={20}
                      onClick={() => handleOpenModal(call)}
                    />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No calls to display</p>
        )}
      </div>

      {selectedCall && (
        <CallDetailsModal
          {...selectedCall}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CallList;
