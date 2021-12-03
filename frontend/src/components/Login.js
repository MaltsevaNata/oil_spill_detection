import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";

export default function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="email"  />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"  />
                    </Form.Group>

                    <Button class="button-login" variant="primary" type="submit" onClick={localStorage.setItem("user", "Наталья Мальцева, РОИВ")}>
                        Войти
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}