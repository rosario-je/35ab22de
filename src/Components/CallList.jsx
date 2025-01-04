import React, { useEffect, useContext } from "react";

//Helpers
import { AppContext } from "../Context/AppContext.jsx";
import { getCallList } from "../API";
import { formatDate } from "../Helpers/DateFunction.js";

//Icons
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoArchiveOutline } from "react-icons/io5";

const CallList = () => {
  const { selectedPage, callList, setCallList } = useContext(AppContext);

  useEffect(() => {
    const fetchCallList = async () => {
      const callData = await getCallList();
      setCallList(callData);
      console.log(callData);
    };

    fetchCallList();
  }, [setCallList]);

  // Filter the call list based on the selected page
  const filteredCallList = callList.filter((call) => {
    if (selectedPage === "Inbox") {
      return call.direction === "inbound";
    }
    if (selectedPage === "Archived Calls") {
      return call.is_archived === "true";
    }
    return true;
  });

  const sortedCallList = filteredCallList.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  return (
    <>
      {selectedPage === "Archived" ? (
        <button className="archive-all-button">
          <IoArchiveOutline size={24} />
          <h2>Unarchive all calls</h2>
        </button>
      ) : (
        <button className="archive-all-button">
          <IoArchiveOutline size={24} />
          <h2>Archive all calls</h2>
        </button>
      )}

      <div className="call-list">
        {filteredCallList.length > 0 ? (
          filteredCallList.map((call) => (
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
