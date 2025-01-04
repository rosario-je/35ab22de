import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Feed from "./Pages/Feed.jsx";

const App = () => {
  return (
    <div className="container">
        <Header />
      <div className="container-view">
        <Feed />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
