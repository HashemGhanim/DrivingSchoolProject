import React, {useEffect, useState} from 'react';
import {Nav} from "react-bootstrap";
import {Outlet  , NavLink} from "react-router-dom";
import Cookies from "js-cookie";

function SignUp(props) {
    const navOfSignUp = ()=>{
        return(
            <>
                <Nav className="">
                    <NavLink to="student" className="col-6 btn btn-outline-info rounded-0 text-black shadow">Add Student</NavLink>
                    <NavLink to="instructor" className="col-6 btn btn-outline-info rounded-0 text-black shadow">Add Instructor</NavLink>
                </Nav>
                <div style={{height:"100vh"}}>
                    <Outlet/>
                </div>
            </>
        )
    }


    useEffect(()=>{
        if(Cookies.get('groupId') != "1" || !Cookies.get('token'))
            window.location.href= 'http://localhost:3000/';
    } , [])

    return (
        navOfSignUp()
    );
}

export default SignUp;