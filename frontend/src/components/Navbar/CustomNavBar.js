import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import io from "socket.io-client";
import React, {useEffect, useState} from "react";
import styles from "./NavBar.css"
import brand from '../../static/brand.png'
import MyVerticallyCenteredModal from "../Login";


export default function NavBar(props) {
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState("");

    useEffect(()=> {
        let user_saved = localStorage.getItem("user");
        setUser(user_saved);
    }, [])

    return (
        <Navbar class="navbar" style={{position: "sticky"}}>
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
                    <Navbar.Text class="auth" style={{width: "200px"}}>
                        {user === "" ?
                            <>
                        <a class="text" href="#login">Регистрация  </a>
                        <div class="delimiter">  | </div>
                        <a class="text" onClick={() => setModalShow(true)}>Вход</a>
                        </>
                            :
                            <div style={{display: "inline"}}> <a  style={{display: "inline", color: "white",}} >{user} </a>
                            <a style={{ cursor: "pointer", display: "inline", position: "absolute", color:"white", right: "10px"}} onClick={() => {localStorage.removeItem("user");
                            setUser("")}}>Выход</a>
                            </div>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Navbar>
    )
}