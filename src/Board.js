import React from "react";
import "./Board.css";
import { userPlaying } from "./App.js";
import io from "socket.io-client";
const socket = io();
const currentPlayer = 2;
const firstPlayer = 3;
const secondPlayer = 4;
const currentMark = 0;

export function Board(props) {
  function onBoxClick(index) {
    const newBoard = [...props.box];
    const players = [...props.users];

    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        console.log(squares);
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }

      return null;
    }

    if (players[currentPlayer] === userPlaying) {
      if (players[currentMark] === "true") {
        newBoard[index] = "O";
        players[currentMark] = "false";
      } else {
        newBoard[index] = "X";
        players[currentMark] = "true";
      }

      props.changeBox(newBoard);

      if (players[currentPlayer] === players[firstPlayer]) {
        players[currentPlayer] = players[secondPlayer];
      } else {
        players[currentPlayer] = players[firstPlayer];
      }

      props.changeUser(players);

      //TODO - fix
      let gameStatus = calculateWinner(newBoard);
      console.log(gameStatus);
      if (gameStatus) {
        if (gameStatus === "X") {
          console.log("Player 2 won");
          alert(players[secondPlayer] + " won!");
          socket.emit("gameFinished", {
            winner: players[secondPlayer],
            loser: players[firstPlayer],
          });
        } else if (gameStatus === "O") {
          console.log("Player 1 won");
          alert(players[firstPlayer] + " won!");
          socket.emit("gameFinished", {
            winner: players[firstPlayer],
            loser: players[secondPlayer],
          });
        }
      }

      socket.emit("board", { message: newBoard });
      socket.emit("user", { message: players });
    }
  }

  return (
    <div class="board">
      <div onClick={() => onBoxClick(0)} class="box">
        {" "}
        {props.box[0]}{" "}
      </div>
      <div onClick={() => onBoxClick(1)} class="box">
        {" "}
        {props.box[1]}{" "}
      </div>
      <div onClick={() => onBoxClick(2)} class="box">
        {" "}
        {props.box[2]}{" "}
      </div>
      <div onClick={() => onBoxClick(3)} class="box">
        {" "}
        {props.box[3]}{" "}
      </div>
      <div onClick={() => onBoxClick(4)} class="box">
        {" "}
        {props.box[4]}{" "}
      </div>
      <div onClick={() => onBoxClick(5)} class="box">
        {" "}
        {props.box[5]}{" "}
      </div>
      <div onClick={() => onBoxClick(6)} class="box">
        {" "}
        {props.box[6]}{" "}
      </div>
      <div onClick={() => onBoxClick(7)} class="box">
        {" "}
        {props.box[7]}{" "}
      </div>
      <div onClick={() => onBoxClick(8)} class="box">
        {" "}
        {props.box[8]}{" "}
      </div>
    </div>
  );
}
