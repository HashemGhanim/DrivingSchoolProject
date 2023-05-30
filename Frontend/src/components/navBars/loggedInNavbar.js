import React, {useEffect, useState} from 'react';
import {Nav, Dropdown} from "react-bootstrap";
import NavToasts from "./navToasts";
import {NavLink, Link} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function LoggedInNavbar(props) {
    const [loading , setLoading] = useState(false);
    const [username , setUsername] = useState("");

    const signOut = ()=>{
        Cookies.remove('token');
        Cookies.remove('groupId');
        Cookies.remove('userId');

        window.location.href = 'http://localhost:3000/';
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/info/' + Cookies.get('userId') , {
            headers:{
                token:Cookies.get('token')
            }
        }).then((res)=>{
            const info = res.data.Information[0];
            setUsername(info.first_name + ' ' + info.last_name);
            setLoading(true);
        }).catch((err)=>{

        })
    } , [])
    return (
            <Nav className="justify-content-end align-items-center">

                {Cookies.get('groupId') === "1" &&
                    <NavLink to="/signUp" className="btn btn-outline-primary h-50">+ Add User</NavLink>
                }

                <Dropdown className="mt-2 mr-2">

                    <Dropdown.Toggle variant="" id="dropdown-basic" bsPrefix="0">
                        <i className="bi bi-bell-fill h4 py-2"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-end my-1 ">
                        <NavToasts time={'11 mins'} body={'We All says hello Mr. Hashem'} />
                        <NavToasts time={'1 hour'} body={'We All says hello Mr. Ahmad'} />
                    </Dropdown.Menu>

                </Dropdown>

                <Dropdown className="my-2 mx-1">
                    <Dropdown.Toggle variant="" id="dropdown-basic" bsPrefix="p-0">
                        <i className="bi bi-person-circle h2 py-2"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-end my-1 ">
                        {
                            loading ? <Dropdown.Item className="py-0 py-1 m-0" >
                                <h4 className="fs-5 text-capitalize">{username}</h4>
                            </Dropdown.Item> : null
                        }
                        <Dropdown.Divider/>
                        <Dropdown.Item>
                            <Link to="/profile" className="w-100 text-decoration-none text-black h-100"><i className="bi bi-person"></i> {' '} Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/settings" className="w-100 text-decoration-none text-black h-100"><i className="bi bi-gear-fill"></i>{' '} Settings</Link></Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={signOut}><i className="bi bi-box-arrow-left"></i>{' '}
                            Sign Out</Dropdown.Item>

                    </Dropdown.Menu>

                </Dropdown>
            </Nav>

    );
}

export default LoggedInNavbar;