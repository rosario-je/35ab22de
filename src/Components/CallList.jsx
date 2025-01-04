import React, { useEffect, useState } from "react";

import { getCallList } from "../API";

import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";

const CallList = () => {
  const [callList, setCallList] = useState([]);

  useEffect(() => {
    const fetchCallList = async () => {
      const callList = await getCallList();
      setCallList(callList);
      console.log(callList);
    };

    fetchCallList();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="call-list">
      <div>
        <h2>Call log:</h2>
      </div>

      {callList.length > 0 ? (
        callList.map((call) => {
          return (
            <div key={call.id} className="call-container">
              {call.direction === "inbound" ? (
                <BsFillTelephoneInboundFill size={24} />
              ) : (
                <BsFillTelephoneOutboundFill size={24} />
              )}
              <div className="call-details">
                <div>
                  <h2>{call.from}</h2>
                  <p>{formatDate(call.created_at)}</p>
                </div>
                <div>
                  <p>Duration: {call.duration} minutes</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No calls to display</p>
      )}
    </div>
  );
};

export default CallList;
