import React, {useState} from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavDropdown, ButtonGroup, Button, Dropdown} from "react-bootstrap";
import {NavLink} from 'react-router-dom'
import "./mainNavbar.css"
import LoggedInNavbar from "./loggedInNavbar";
import NonLoggedInNavbar from "./nonLoggedInNavbar";
import Cookies from 'js-cookie';


function MainNavbar(props) {



    return (
            <Navbar expand="md" className="p-0 main-color-navbar shadow" >

                <Container fluid={true}>

                    <NavbarBrand className="fs-4 fw-bold m-1" id="nav-brand">
                        <img src="https://cdn.dribbble.com/users/2346489/screenshots/10416714/media/1b8a7a1225ad4879ae80742c136a2306.png"
                             style={{width:"40px" , height : "40px"}} className="mx-1 rounded-pill" alt="logo"/>
                        Palestine School
                    </NavbarBrand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between m-0">

                        <Nav className="me-auto" className="mx-3 m-0">

                            <NavLink to="/" className="fs-5 text-center text-secondary text-decoration-none px-3 NavLink">Home</NavLink>
                            <NavLink to="/courses" className="fs-5 text-center text-secondary text-decoration-none px-3 NavLink">Courses</NavLink>
                            <NavLink to="/instructors" className="fs-5 text-center text-secondary text-decoration-none px-3 NavLink">Instructors</NavLink>
                            <NavLink to="/about" className="fs-5 text-center text-secondary text-decoration-none px-3 NavLink">About</NavLink>
                        </Nav>
                        {Cookies.get('token') ? <LoggedInNavbar/> : <NonLoggedInNavbar/>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default MainNavbar;