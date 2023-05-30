import React, {useEffect, useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import NotFound from "../../../notFound";
import Cookies from "js-cookie";

function ProfileNavMain(props) {

    const studentProf=()=>{
        return (
            <nav className="w-100">
                <NavLink to={"info"} className="col-3 btn btn-outline-info rounded-0 text-black shadow"> Information</NavLink>
                <NavLink to={"appointments"} className="col-3 btn btn-outline-info rounded-0 text-black shadow"> Appointments</NavLink>
                <NavLink to={"tests"} className="col-3 btn btn-outline-info rounded-0 text-black shadow">Tests</NavLink>
                <NavLink to={"instructors"} className="col-3 btn btn-outline-info rounded-0 text-black shadow">Instructors</NavLink>
            </nav>
        )
    }
    const forHrProf=()=>{
        return (
            <nav className="w-100">
                <NavLink to={"info"} className="col-3 btn btn-outline-info rounded-0 text-black shadow">Information</NavLink>
                <NavLink to={"instructors"} className="col-3 btn btn-outline-info rounded-0 text-black shadow">Instructors</NavLink>
                <NavLink to={"students"} className="col-2 btn btn-outline-info rounded-0 text-black shadow">Students</NavLink>
                <NavLink to={"appointments"} className="col-2 btn btn-outline-info rounded-0 text-black shadow">Lessons</NavLink>
                <NavLink to={"tests"} className="col-2 btn btn-outline-info rounded-0 text-black shadow">Tests</NavLink>
            </nav>
        )
    }
    const InstructorProf=()=>{
        return (
            <nav className="w-100">
                <NavLink to={"info"} className="col-4 btn btn-outline-info rounded-0 text-black shadow"> Information</NavLink>
                <NavLink to={"appointments"} className="col-4 btn btn-outline-info rounded-0 text-black shadow"> Appointments</NavLink>
                <NavLink to={"students"} className="col-4 btn btn-outline-info rounded-0 text-black shadow"> Students</NavLink>
            </nav>
        )
    }

    const user = useSelector(state => state);



    const contant = ()=> {
        return (
            <>
                <div style={{backgroundColor:"#efe8e8"}} className="d-flex w-100">
                    {
                        Cookies.get('groupId') === "1"   ? forHrProf() : Cookies.get('groupId') === "2"  ? InstructorProf() : (Cookies.get('groupId') === "3") && studentProf()
                    }
                </div>

                <div style={{backgroundColor:"#efe8e8" ,height:"100vh"}} className="m-0 p-0 shadow">
                    <Outlet/>
                </div>
            </>
        )
    }

    useEffect(()=>{
        if(!Cookies.get('token'))
            window.location.href = 'http://localhost:3000/';
    } , [])

    return (
        contant()
    );
}

export default ProfileNavMain;