import React, { useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ChatList from './ChatList'
import ChatArea from './ChatArea'
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:3000';
var socket, selectedChatCompare;

export default function Dashboard() {
    useEffect(() => {
        socket = io(ENDPOINT);
      }, []);
    return (
        <Container fluid>
            <Row>
                <Col sm={4} className='p-0'>
                    <ChatList />
                </Col>
                <Col sm={8} className='p-0'>
                    <ChatArea />
                </Col>
            </Row>
        </Container>
    )
}
