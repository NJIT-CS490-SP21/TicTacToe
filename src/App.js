import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection



function App() {
   const [myList, changeList] = useState(['false','','','','','','','','','']);
   
    useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      changeList(data.message);
    });
  }, []);
   return (
    <div>
    <Board list={myList} changeList={changeList}/>
    </div>
  );
}

export default App;