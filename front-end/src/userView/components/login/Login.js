import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './login.css'
import { LibraryContext } from '../../../context/LibraryContext';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const { login, reloadData } = useContext(LibraryContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const location = useLocation();

    const handleUserNameChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        login(userName, password);
        
        history.push('/')
        window.location.reload()
    }

    return (
        <Form className="loginForm" onSubmit={ handleSubmit }>
            <h2>Login</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleUserNameChange} value={userName} required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Login;