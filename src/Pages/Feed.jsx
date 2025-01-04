import React from "react";
import CallList from "../Components/CallList.jsx";

const Feed = () => {
  return (
    <section>
      <div>This is the user feed</div>
      <button>Archive all calls</button>
      <CallList />
    </section>
  );
};

export default Feed;
