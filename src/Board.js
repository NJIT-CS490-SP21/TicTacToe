import React from 'react';
import './Board.css';
import { userPlaying } from "./App.js"
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
const socket = io();

export function Board(props) {

    
    
    
    function onBoxClick(index){
        const newBoard = [...props.box];
        const players = [...props.users]
    if(players[2] == userPlaying){
        
        if(newBoard[0] == 'true'){
           newBoard[index] = "O";
           newBoard[0] = 'false';
        }
        else {
            newBoard[index] = 'X';
            newBoard[0] = 'true';
        }

        props.changeBox(newBoard);
        
        
        if(players[2] == players[3]){
            players[2] = players[4]
        }
        else{
            players[2] = players[3]
        }
        
        props.changeUser(players)
        
        socket.emit('board', {message: newBoard});
        socket.emit('user', {message: players})
        

    }
    
        
    }
    
    
    

    return <div class="board">
  <div onClick={() => onBoxClick(1)} class="box"> {props.box[1]} </div>
  <div onClick={() => onBoxClick(2)} class="box"> {props.box[2]} </div>
  <div onClick={() => onBoxClick(3)} class="box"> {props.box[3]} </div>
  <div onClick={() => onBoxClick(4)} class="box"> {props.box[4]} </div>
  <div onClick={() => onBoxClick(5)} class="box"> {props.box[5]} </div>
  <div onClick={() => onBoxClick(6)} class="box"> {props.box[6]} </div>
  <div onClick={() => onBoxClick(7)} class="box"> {props.box[7]} </div>
  <div onClick={() => onBoxClick(8)} class="box"> {props.box[8]} </div>
  <div onClick={() => onBoxClick(9)} class="box"> {props.box[9]} </div>
</div>;
    
    }
   