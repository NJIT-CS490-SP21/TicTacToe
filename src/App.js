import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import './Board.css';
import { Board } from './Board.js';


const socket = io(); // Connects to socket connection

export var userPlaying = '';

function App() {
  const [box, changeBox] = useState(['false','','','','','','','','','','0','0']);
  useEffect(() => {

    socket.on('board', (fromServer) => {
   
 
      changeBox(fromServer.message);
      
    });
  }, []);
  
   useEffect(() => {

    socket.on('board', (fromServer) => {
  

      changeBox(fromServer.message);
      
    });
  }, []);
  
  const mySubmitHandler = (gameStarted) => {
    
    gameStarted.preventDefault();
    var userInput = document.getElementsByName('textbox')[0].value
    
    userPlaying = document.getElementsByName('textbox')[0].value
    
    if (box[13] == null){
      
      box[13] = userInput
      
      
      box[11] = 1;
      
      box[12] = userPlaying
      
      
      
 
      
      socket.emit('board', {message: box});
      
    } else if (box[14] == null){
      
      box[11] = 2;
      
      
      box[12] = userPlaying
      
      
      box[14] = userInput
      
      socket.emit('board', {message: box});
      
    } else{
    box[11] = 1 + box[11];
    
    socket.emit('board', {message: box});
    
    box.push(userInput)
      
    }
    
  }
  

  
  
  
  return (
    
  <div className="App">
  <div className="half">

  {(box[11] <= 0 || userPlaying == '') ? (
    <span>  <form onSubmit={mySubmitHandler} >
    <p>Name:</p>
    <input type="text" name="textbox" />
  
    <input type="submit" value="Sign in" />
    </form></span>
  ) : (
    <span className="product-loggedin">Tic Tac Toe<Board box={box} changeBox={changeBox} />{userPlaying}</span>
  )}
  

</div>
  </div>
  );
  
  
  }


export default App;