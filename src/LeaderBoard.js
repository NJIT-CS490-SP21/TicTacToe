import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Display } from './DisplayL.js';
import io from 'socket.io-client';

const socket = io();

export var LeaderOpen = 'false';


export function Leaderboard() {

const [data, changeData] = useState([]);


   function onClickLeaderBoard(){
        
        if (LeaderOpen == 'false'){
            LeaderOpen = 'true';
        }
        else
            LeaderOpen = 'false';
        
        socket.emit('Leaderboard');
    }
    
    
    
    if(LeaderOpen == 'false') {
    return(
    <div><button onClick={onClickLeaderBoard}>LeaderBoard</button></div>
    );
    }
    else {
        console.log("Opended leaderBoard")
    return(<div> 
        <button onClick={onClickLeaderBoard}>LeaderBoard</button> 
        <table>
            <tr>
                <th>Username</th>
                <th>score</th>
                
            </tr>
            {data.map(item => <Display name={item} />)}
    
    </table> 
    </div>);
    }
}