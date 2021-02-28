import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { currentUser } from "./App.js"
const socket = io();

export function Board(props) {

    
    
    
    function onClickButton(test){
        const newList = [...props.list];
    if(newList[12] == currentUser){
        
        if(newList[0] == 'false'){
            newList[test] = 'x';
            newList[0] = 'true';
        }
        else {
           newList[test] = "o";
           newList[0] = 'false';
        }

        props.changeList(newList);

        
        
        if(newList[12] == newList[13]){
            newList[12] = newList[14]
        }
        else{
            newList[12] = newList[13]
        }
        socket.emit('board', {message: newList});
        

    }
    
        
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
   
    