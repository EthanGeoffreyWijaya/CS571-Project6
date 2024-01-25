import React, { useEffect, useState, useRef, useContext } from "react";
import {Container, Row, Col, Pagination, Form, Button} from "react-bootstrap";

import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const title = useRef();
    const content = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages);
        })
    };

    const deletePost = (id) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                loadMessages();
            }
        })
    }


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(()=> {
        setPage(1);
        loadMessages();
    }, [props]);
    useEffect(loadMessages, [page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        <br/>
            <Form>
                <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                <Form.Control id="postTitle" ref={title}/>
                <Form.Label htmlFor="postContent">Post Content</Form.Label>
                <Form.Control id="postContent" ref={content}/>
            </Form>
            <br/>
            <Button onClick={()=> {
                if (loginStatus === undefined) {
                    alert("You must be logged in to do that!");
                    return;
                }
                if (title.current.value === "" || content.current.value === "") {
                    alert("You must provide both a title and content!");
                    return;
                }
                
                fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "X-CS571-ID": CS571.getBadgerId(),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'title': title.current.value,
                        'content': content.current.value
                    })
                })
                .then(res => {
                    if (res.status === 200) {
                        alert("Successfully posted!");
                        title.current.value = "";
                        content.current.value = "";
                        loadMessages();
                    }
                })
            }}>Post</Button>
        {
            messages.length > 0 ?
                <Container fluid={true}>
                <Row>
                    {
                        messages.map(msg => {
                            return <Col key={msg.id} xs={12} sm={6} md={4} xl={3}>
                                <BadgerMessage delete={deletePost} {...msg}/>
                            </Col>
                        })
                    }
                </Row>
                </Container>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
                <Pagination.Item active={page===1} onClick={()=>{setPage(1)}}>1</Pagination.Item>
                <Pagination.Item active={page===2} onClick={()=>{setPage(2)}}>2</Pagination.Item>
                <Pagination.Item active={page===3} onClick={()=>{setPage(3)}}>3</Pagination.Item>
                <Pagination.Item active={page===4} onClick={()=>{setPage(4)}}>4</Pagination.Item>
        </Pagination>
    </>
}
