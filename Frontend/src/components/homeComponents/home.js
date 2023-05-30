import React, {useEffect, useState} from 'react';
import './home.css'
import MainCarousel from "./mainCarousel";
import {Container, Row, Col, Image} from "react-bootstrap";
import mainImg from "./pexels-mike-b-170286.jpg"
import ArticleHomePage from "./articleHomePage";
function Home(props) {

    return (
        <div>
            <div className="my-1">
                <MainCarousel/>

                <div className="my-5">
                    <div id="welcomeText">
                        <h1 className="text-center text-font-sp">Welcome To Palestine School 🎓</h1>
                        <h5 className="text-center text-font-sp">Driving School</h5>
                    </div>
                </div>

                <ArticleHomePage/>
            </div>
        </div>
    );
}

export default Home;