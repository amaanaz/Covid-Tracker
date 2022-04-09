import React from "react";
import "./App.css";
import bootstrap from "bootstrap"
import Navbar from "./Navbar"
import Table from "./Table";
import Global from "./Global";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Table />
      <Global />
    </div>
  );
}

export default App;