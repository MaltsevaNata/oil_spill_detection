import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import io from "socket.io-client";
import React, {useEffect} from "react";
import styles from "./NavBar.css"
import brand from '../../static/brand.png'

const socket = io.connect('ws://127.0.0.1:5000',{transports: ['websocket'], secure: true, port: '5000'});

export default function NavBar(props) {

    return (
        <Navbar class="navbar">
            <Container>
                <Navbar.Brand  style={{    position: "absolute",
                    left: "5px"}} href="https://rosatom.ru/">
                    <img
                        src={brand}
                        height="30px"
                        className="d-inline-block align-top"
                        alt=""
                    />

                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text class="auth">
                        <a class="text" href="#login">Регистрация  </a>
                        <div class="delimiter">  | </div>
                        <a class="text" href="#login">Вход</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}