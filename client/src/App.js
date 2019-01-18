import React, { Component } from "react";
import LoginProtected from "./container/LoginProtected";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ background: "#f8f9fa" }}>
        <LoginProtected />
      </div>
    );
  }
}

export default App;
