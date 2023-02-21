import React from 'react';
import { Nav, Container, Navbar, Row, Col} from 'react-bootstrap'
import { NavLink } from "react-router-dom"
const MenuComponent = () => {
    return (<>
        <Navbar bg="dark" expand="lg" variant="dark" className="test">
                <Container>
                    <Navbar.Brand href="#home">Logo Here</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className={"nav-link"} to="/">Home</NavLink>
                            <NavLink className={"nav-link"} to="/register">Register</NavLink>
                            <NavLink className={"nav-link"} to="/login">Login</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </>)
}

export default MenuComponent;