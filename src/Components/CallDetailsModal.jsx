import React, { useState } from "react";
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
  call_type,
  isOpen,
  onClose,
  selectedPage,
}) => {
  const [loading, setLoading] = useState(false);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleCallUpdate = async () => {
    setLoading(true);

    try {
      // Determine the new archive status
      const newArchiveStatus =
        selectedPage === "Archived" || is_archived ? false : true;


      const updatedCall = await updateCall(id, {
        is_archived: newArchiveStatus,
      });
      console.log(`Updated call ${id}:`, updatedCall);

      onClose();
    } catch (error) {
      console.error(`Failed to update call ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <div
      id="modal-container"
      tabIndex="-1"
      className={`fixed inset-0 flex items-center justify-center duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`modal-box w-[350px] max-w-sm mx-4 bg-white rounded-lg shadow-lg transform transition-all duration-300 border ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center py-4 px-6 border-b border-zinc-200">
          <div>
            <h3 className="text-[15px] font-semibold text-zinc-800">
              {direction === "inbound" ? (
                <>
                  <span className=" text-zinc-800">Inbound Caller:</span>{" "}
                  <span className="italic">{from}</span>
                </>
              ) : (
                <>
                  <span className="text-sm text-zinc-800">You called:</span>{" "}
                  {from}
                </>
              )}
            </h3>
            <p
              className={`text-sm ${
                call_type === "missed" ? "text-red-600" : "text-zinc-800"
              }`}
            >
              {call_type}
            </p>
          </div>
        </div>

        <div className="py-4 px-6 space-y-3">
          <p className="text-sm text-zinc-600">Call Date: {formattedDate}</p>
          <p className="text-sm text-zinc-600">
            Call Duration: {formatDuration(duration)}
          </p>
          <p className="text-sm text-zinc-600">Via: {via}</p>
        </div>
        <div className="flex justify-end p-4 border-t border-zinc-200">
          <button
            id="close-button"
            type="button"
            className="px-4 py-2 text-sm font-semibold text-blue-600 bg-zinc-200 rounded-lg hover:bg-zinc-300 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
          <button
            id="archive-button"
            type="button"
            className={`ml-2 px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none ${
              selectedPage === "Archived" || is_archived
                ? "text-green-600 bg-zinc-200 hover:bg-zinc-300"
                : "text-red-600 bg-zinc-200 hover:bg-zinc-300"
            }`}
            onClick={handleCallUpdate}
            disabled={loading}
          >
            {loading
              ? selectedPage === "Archived" || is_archived
                ? "Unarchiving..."
                : "Archiving..."
              : selectedPage === "Archived" || is_archived
              ? "Unarchive"
              : "Archive"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsModal;
