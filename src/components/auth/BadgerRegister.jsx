import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Button} from "react-bootstrap";

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // TODO Create the register component.

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label column htmlFor="usernameInput">Username:</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={e => {setUsername(e.target.value)}}/>
            <Form.Label column htmlFor="passwordInput">Password:</Form.Label>
            <Form.Control id="passwordInput" type="password" value={password} onChange={e => {setPassword(e.target.value)}}/>
            <Form.Label column htmlFor="confirmPasswordInput">Confirm Password:</Form.Label>
            <Form.Control id="confirmPasswordInput" type="password" value={cPassword} onChange={e => {setCPassword(e.target.value)}}/>
        </Form>
        <br/>
        <Button onClick={() => {
            if (username === "" || password === "") {
                alert("You must provide both a username and password!");
                return;
            }

            if (password != cPassword) {
                alert("Your passwords do not match!");
                return;
            }

            fetch('https://cs571.org/api/f23/hw6/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username":username,
                    "password":password
                })
            })
            .then(res => {
                if (res.status === 409) {
                    alert("That username has already been taken!");
                } else if (res.status === 200) {
                    alert("You have been succesfully registered!");
                    setUsername("");
                    setPassword("");
                    setCPassword("");
                }
            })
        }}>Register</Button>
    </>
}
