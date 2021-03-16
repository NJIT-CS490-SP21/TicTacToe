import logo from "./logo.svg";
import "./App.css";
import "./Board.css";
import { BoardCreate } from "./Board.js";
import { useState } from "react";
import { OnClickButton } from "./Board.js";

function App() {
  return (
    <div>
      <BoardCreate />
    </div>
  );
}

export default App;
