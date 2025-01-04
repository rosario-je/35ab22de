import React from "react";
import CallList from "../Components/CallList.jsx";
import { IoArchiveOutline } from "react-icons/io5";

const Feed = () => {
  return (
    <section>
      <div className="archive-all-button">
        <IoArchiveOutline size={24} />
        <h2>Archive all calls</h2>
      </div>
      <CallList />
    </section>
  );
};

export default Feed;
