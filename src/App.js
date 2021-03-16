import logo from "./logo.svg";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import "./Board.css";
import { Board } from "./Board.js";

const socket = io();

export var userPlaying = "";
const currentPlayer = 2;
const firstPlayer = 3;
const secondPlayer = 4;
const playerCount = 1;

function App() {
  const [box, changeBox] = useState(["", "", "", "", "", "", "", "", ""]);
  const [usersInside, loginUser] = useState(["false", "0"]);
  const [leaderBoard, changeBoard] = useState([]);
  const [emptyList, changeEmptyList] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function ListItem(props) {
    return (
      <tr>
        <td>{props.name[0]}</td>
        <td>{props.name[1]}</td>
      </tr>
    );
  }

  //emit user to backened to save to DB
  function userJoined(userName) {
    if (userName != "") {
      socket.emit("userSignedIn", { userJoined: userName });
    }
  }

  useEffect(() => {
    socket.on("board", (fromServer) => {
      changeBox(fromServer.message);
      // console.log(fromServer.message)
    });

    socket.on("user", (fromServer) => {
      loginUser(fromServer.message);
      // console.log(fromServer.message)
    });

    socket.on("leaderBoard", (fromServer) => {
      changeBoard(fromServer.players);
    });
  }, []);

  const mySubmitHandler = (gameStarted) => {
    gameStarted.preventDefault();
    var userInput = document.getElementsByName("textbox")[0].value;
    //emit user to backened to save to DB
    userJoined(userInput);
    userPlaying = document.getElementsByName("textbox")[0].value;

    if (usersInside[firstPlayer] == null) {
      usersInside[firstPlayer] = userInput;

      usersInside[playerCount] = 1;

      usersInside[currentPlayer] = userPlaying;

      // console.log(usersInside)

      socket.emit("user", { message: usersInside });
      socket.emit("board", { message: box });
    } else if (usersInside[secondPlayer] == null) {
      usersInside[playerCount] = currentPlayer;

      usersInside[currentPlayer] = userPlaying;
      // console.log(usersInside)

      usersInside[secondPlayer] = userInput;

      socket.emit("user", { message: usersInside });
      socket.emit("board", { message: box });
    } else {
      usersInside[playerCount] = 1 + usersInside[playerCount];
      // console.log(usersInside)
      socket.emit("user", { message: usersInside });
      socket.emit("board", { message: box });

      usersInside.push(userInput);
    }
  };

  function resetBoard() {
    changeBox(emptyList);
    socket.emit("board", { message: emptyList });
  }

  return (
    <div className="App">
      <div className="half">
        {usersInside[1] <= 0 || userPlaying == "" ? (
          <span>
            {" "}
            <form onSubmit={mySubmitHandler}>
              <p>Name:</p>
              <input type="text" name="textbox" />

              <input type="submit" value="Sign in" />
            </form>
          </span>
        ) : (
          <div>
            <span className="product-loggedin">
              Tic Tac Toe
              <Board
                users={usersInside}
                changeUser={loginUser}
                box={box}
                changeBox={changeBox}
              />
              {userPlaying}
            </span>
            <div>
              <input onClick={() => resetBoard()} type="submit" value="Reset" />
            </div>
          </div>
        )}

        <span className="product-loggedin">
          <table>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>

            {leaderBoard.map((value, index) => (
              <ListItem key={index} name={value} />
            ))}
          </table>
        </span>
      </div>
    </div>
  );
}

export default App;
