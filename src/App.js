import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

export var currentUser = '';

function App() {
  const [myList, changeList] = useState(['false','','','','','','','','','','0','0']);
  useEffect(() => {

    socket.on('board', (data) => {
      console.log(data);
 
      changeList(data.message);
      
    });
  }, []);
  
   useEffect(() => {

    socket.on('board', (data) => {
      console.log(data);

      changeList(data.message);
      
    });
  }, []);
  
  const mySubmitHandler = (event) => {
    
    event.preventDefault();
    var userin = document.getElementsByName('textbox')[0].value
    currentUser = document.getElementsByName('textbox')[0].value
    if (myList[13] == null){
      //current player
      myList[12] = currentUser
      myList[11] = 1;
      
      myList[13] = userin
      socket.emit('connected', {message: myList});
    }
    else if (myList[14] == null){
      myList[12] = currentUser
      myList[11] = 2;
      myList[14] = userin
      socket.emit('connected', {message: myList});
    }
    else{
    myList[11] = 1 + myList[11];
    socket.emit('connected', {message: myList});
    myList.push(userin)
      
    }
    
  }
  

  
  
  
  return (
    
  <div className="App">
  <div className="half">

  {(myList[11] <= 0 || currentUser == '') ? (
    <span>  <form onSubmit={mySubmitHandler} >
  <p>Name:</p>
    <input type="text" name="textbox" />
  
  <input type="submit" value="Sign in" />
  </form></span>
  ) : (
    <span className="product-loggedin">{myList[11]} signed in<Board list={myList} changeList={changeList} />{currentUser}</span>
  )}
  

</div>
  </div>
  );
  
  
  }


export default App;
