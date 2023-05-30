import React from 'react';
import { Nav } from "react-bootstrap";
import {Link} from "react-router-dom";



function NonLoggedInNavbar(props) {



    return (
            <Nav className="justify-content-end ">

                    <Link to="/signIn" className="btn btn-outline-primary h-50">Sign In</Link>

            </Nav>
    );
}

export default NonLoggedInNavbar;