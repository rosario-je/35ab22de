import React from "react";
import ReactDOM from "react-dom";

import { ContextProvider } from "./Context/AppContext.jsx";
import Header from "./Header.jsx";
import Feed from "./Pages/Feed.jsx";
import CallList from "./Components/CallList.jsx";
import BottomNav from "./Components/BottomNav.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="content-container">
        <Feed />
        <BottomNav />
      </div>
    </div>
  );
};

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("app")
);

export default App;
