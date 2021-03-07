import React from 'react';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Display(props) {
    console.log(props);
    return (
    <tr>
    <td>{props.name[0]}</td>
    <td>{props.name[1]}</td>
    <td>{props.name[2]}</td>
    </tr>);

}