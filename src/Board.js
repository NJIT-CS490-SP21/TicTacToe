import React from 'react';
import './Board.css';
import { useState } from 'react';

export function BoardCreate() {
    const [myList, changeList] = useState(['','','','','','','','','']);
    
    function ButtonClicked(index) {
        changeList(prevList => [...prevList, prevList[index] = 'x']);
    }
    
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


