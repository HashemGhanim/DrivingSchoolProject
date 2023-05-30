import React from 'react';
import MainNavbar from "../components/navBars/mainNavbar";
import Footer from "../components/footer/footer";
import {Outlet} from "react-router-dom";

function RootLayout(props) {
    return (
        <div>
            <MainNavbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default RootLayout;