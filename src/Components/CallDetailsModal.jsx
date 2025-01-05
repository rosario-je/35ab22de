import React from "react";

import { FaArchive } from "react-icons/fa";

import { updateCall } from "../API";

const CallDetailsModal = ({
  id,
  created_at,
  direction,
  from,
  to,
  via,
  duration,
  is_archived,
  isOpen,
  onClose,
  refreshCallList, // Added refreshCallList as a prop
}) => {
  const handleCallUpdate = async () => {
    try {
      const updatedCall = await updateCall(id, {
        is_archived: true,
      });
      console.log(`Updated call ${id}:`, updatedCall);

      // Refresh the call list after archiving
      refreshCallList();

      // Close the modal after archiving
      onClose();
    } catch (error) {
      console.error(`Failed to update call ${id}:`, error);
    }
  };

  return (
    <div
      id="modal-container"
      tabIndex="-1"
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.3s ease-in-out" }}
    >
      <div
        className={`modal-box w-[350px] mr-4 transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          {direction === "inbound" ? (
            <h3 className="text-zinc-100">
              <span>Inbound Caller:</span> {from}
            </h3>
          ) : (
            <h3 className="text-zinc-100">
              <span>You called:</span> {from}
            </h3>
          )}
          <button onClick={handleCallUpdate}>
            <FaArchive className="text-white" />
          </button>
        </div>
        <p className="py-4">Call duration: {duration} seconds</p>
        <div className="modal-action">
          <form method="dialog">
            <button type="button" className="btn btn-sm" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsModal;
