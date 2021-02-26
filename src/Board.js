import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Board(props) {
    //console.log(props);
    
    
    
    function onClickButton(test){
        const newList = [...props.list];
        if(newList[0] == 'false'){
            newList[test] = 'x';
            newList[0] = 'true';
        }
        else {
           newList[test] = "o";
           newList[0] = 'false';
        }
        //console.log(props.list);
      // If the server send
        props.changeList(newList);
        //changeList(newList);
        socket.emit('board', {message: newList});
    }
    
    

    return <div class="board">
  <div onClick={() => onClickButton(1)} class="box"> {props.list[1]} </div>
  <div onClick={() => onClickButton(2)} class="box"> {props.list[2]} </div>
  <div onClick={() => onClickButton(3)} class="box"> {props.list[3]} </div>
  <div onClick={() => onClickButton(4)} class="box"> {props.list[4]} </div>
  <div onClick={() => onClickButton(5)} class="box"> {props.list[5]} </div>
  <div onClick={() => onClickButton(6)} class="box"> {props.list[6]} </div>
  <div onClick={() => onClickButton(7)} class="box"> {props.list[7]} </div>
  <div onClick={() => onClickButton(8)} class="box"> {props.list[8]} </div>
  <div onClick={() => onClickButton(9)} class="box"> {props.list[9]} </div>
</div>;
    
    }