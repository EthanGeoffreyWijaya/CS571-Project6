import React, {useRef, useState, useContext} from 'react';
import {Row, Col, Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    const username = useRef();
    const password = useRef();
    const backToHome = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="usernameInput">Username:</Form.Label>
            <Form.Control id="usernameInput" ref={username}/>
            <Form.Label htmlFor="passwordInput">Password:</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={password}/>

        </Form>
        <br/>
        <Button onClick={() => {
            if (username.current.value === "" || password.current.value === "") {
                alert("You must provide both a username and password!");
                return;
            }

            fetch('https://cs571.org/api/f23/hw6/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username":username.current.value,
                    "password":password.current.value
                })
            })
            .then(res => {
                if (res.status === 401) {
                    alert("Incorrect username or password!");
                } else if (res.status === 200) {
                    alert("You have been succesfully logged in!");
                    sessionStorage.user = username.current.value;
                    setLoginStatus(sessionStorage.user);
                    backToHome("/");
                }
            })
        }}>Login</Button>
    </>
}
