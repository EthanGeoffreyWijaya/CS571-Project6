import React, { useContext} from "react"
import { Card, Button } from "react-bootstrap";

import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            (props.poster === loginStatus)?
            <Button style={{'background-color':'red', 'border-color':'white'}} onClick={()=>{props.delete(props.id)}}>Delete Post</Button>
            :
            <></>
        }
    </Card>
}

export default BadgerMessage;