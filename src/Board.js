import React from 'react';
import './Board.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function BoardCreate() {
    const [myList, changeList] = useState(['','','','','','','','','']);
    
    function ButtonClicked(index) {
        const newList = [...myList];
        console.log(newList)
        newList[index] = "x";
        changeList(newList);
        console.log(newList)
        socket.emit('board', {newList});
    }
    
    
    
 useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Board event received!');
      console.log(data);
      console.log(myList)
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      changeList(myList => [...myList, data.message]);
    });
  }, []);
    
    
    return <div className="board">
    <div onClick={() => ButtonClicked(0)} class="box"> {myList[0]} </div>
    <div onClick={() => ButtonClicked(1)} class="box"> {myList[1]} </div>
    <div onClick={() => ButtonClicked(2)} class="box"> {myList[2]} </div>
    <div onClick={() => ButtonClicked(3)} class="box"> {myList[3]} </div>
    <div onClick={() => ButtonClicked(4)} class="box"> {myList[4]} </div>
    <div onClick={() => ButtonClicked(5)} class="box"> {myList[5]} </div>
    <div onClick={() => ButtonClicked(6)} class="box"> {myList[6]} </div>
    <div onClick={() => ButtonClicked(7)} class="box"> {myList[7]} </div>
    <div onClick={() => ButtonClicked(8)} class="box"> {myList[8]} </div>
    </div>;
    
}


