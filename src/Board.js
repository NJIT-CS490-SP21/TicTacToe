import React from 'react';
import './Board.css';
import { userPlaying } from "./App.js"
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
const socket = io();
const currentPlayer = 2;
const firstPlayer = 3;
const secondPlayer = 4;
const currentMark = 0;

export function Board(props) {

    
    
    
    function onBoxClick(index){
        const newBoard = [...props.box];
        const players = [...props.users]
    if(players[currentPlayer] == userPlaying){
        
        if(newBoard[currentMark] == 'true'){
           newBoard[index] = "O";
           newBoard[currentMark] = 'false';
        }
        else {
            newBoard[index] = 'X';
            newBoard[currentMark] = 'true';
        }

        props.changeBox(newBoard);
        
        
        if(players[currentPlayer] == players[firstPlayer]){
            players[currentPlayer] = players[secondPlayer]
        }
        else{
            players[currentPlayer] = players[firstPlayer]
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