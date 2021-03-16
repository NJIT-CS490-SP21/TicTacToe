// import React from 'react';
// import './Board.css';
// import { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io();

// export function Login() {
//     const inputRef = useRef(null);
//     const [users, userSignIn] = useState([]);
//     function onClickSignin() {
//         const userText = inputRef.current.value;
//         userSignIn(userText);
//         socket.emit("signIn", {userSignIn: userText})
//     }

//     return<div>
//     <p>Username</p>
//     <input ref={inputRef} type="username"/>
//     <button onClick={onClickSignin}> Sign in</button>

//     </div>;

// }
