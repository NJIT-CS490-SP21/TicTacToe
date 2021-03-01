import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import './Board.css';
import { Board } from './Board.js';


const socket = io(); // Connects to socket connection

export var userPlaying = '';

function App() {
  const [box, changeBox] = useState(['false','','','','','','','','','']);
  const [usersInside, loginUser] = useState(['0','0'])
  
   useEffect(() => {

    socket.on('board', (fromServer) => {
      
      changeBox(fromServer.message)
      console.log(fromServer.message)
      
    });
  }, []);
  
  
   useEffect(() => {

    socket.on('user', (fromServer) => {
      
      loginUser(fromServer.message)
     console.log(fromServer.message)
      
      
    });
  }, []);
  
  
  const mySubmitHandler = (gameStarted) => {
    
    gameStarted.preventDefault();
    var userInput = document.getElementsByName('textbox')[0].value
    
    userPlaying = document.getElementsByName('textbox')[0].value
    
    if (usersInside[3] == null){
      
      usersInside[3] = userInput
      
      
      usersInside[1] = 1;
      
      usersInside[2] = userPlaying
      
      
      console.log(usersInside)
 
      socket.emit('user', {message: usersInside})
      socket.emit('board', {message: box});
      
    } else if (usersInside[4] == null){
      
      usersInside[1] = 2;
      
      
      usersInside[2] = userPlaying
      console.log(usersInside)
      
      usersInside[4] = userInput
      
      socket.emit('user', {message: usersInside})
      socket.emit('board', {message: box});;
      
    } else{
    usersInside[1] = 1 + usersInside[1];
    console.log(usersInside)
     socket.emit('user', {message: usersInside})
     socket.emit('board', {message: box});;
    
    usersInside.push(userInput)
      
    }
    
  }
  

  
  
  
  return (
    
  <div className="App">
  <div className="half">

  {(usersInside[1] <= 0 || userPlaying == '') ? (
    <span>  <form onSubmit={mySubmitHandler} >
    <p>Name:</p>
    <input type="text" name="textbox" />
  
    <input type="submit" value="Sign in" />
    </form></span>
  ) : (
    <span className="product-loggedin">Tic Tac Toe<Board users={usersInside} changeUser={loginUser} box={box} changeBox={changeBox} />{userPlaying}</span>
  )}
  

</div>
  </div>
  );
  
  
  }


export default App;