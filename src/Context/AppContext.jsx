import React, { createContext, useState } from "react";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState("Inbox");
  const [callList, setCallList] = useState([]);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const providerValue = {
    selectedPage,
    setSelectedPage,
    handlePageClick,
    callList,
    setCallList,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
