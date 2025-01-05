import React from "react";

const LoadingScreen = (props) => {
  return (
    <div className="loading-screen flex flex-col w-full h-[500px] justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
      <p>{props.message}</p>
    </div>
  );
};

export default LoadingScreen;
