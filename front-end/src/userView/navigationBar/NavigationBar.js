import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { LibraryContext } from '../../context/LibraryContext';

const Styles = styled.div`
  .navbar {
    background-color: white;
    border-bottom: 1px solid #bbb;
  }
  .nav-item, navbar-brand {
    padding: 10px;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: black;
    }
  }
  .navbar-brand {
    font-size: 30px;
    font-weight: bold
  }
`;

const NavigationBar = () => {
    const { auth, logout } = useContext(LibraryContext);
    const history = useHistory();

    const handleLogOut = () => {
      logout();
      history.push('/');
      window.location.reload();
    }

    return (
        <Styles>
            <Navbar fixed="top" expand="lg">
                <Navbar.Brand href="/">LIBRARY</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Link to="/">Home</Link>
                        </Nav.Item>
                        { !auth &&
                          <Nav.Item>
                              <Link to="/login">Login</Link>
                          </Nav.Item>
                        }
                        { auth &&
                          <Button onClick={() => handleLogOut()}>Log out</Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles >
    )
}

export default NavigationBar;