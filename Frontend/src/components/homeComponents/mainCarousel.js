import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import secondImg from "../mainCarouselImg/secondImg.jpg";
import firstImg from "../mainCarouselImg/PHOTO-2023-04-25-21-07-45.png";
import thirdImg from "../mainCarouselImg/thirdImg.png"
import {Container} from "react-bootstrap";

function MainCarousel(props) {
    return (
        <Container fluid className="w-100 p-0">
            <Carousel className="shadow">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={firstImg}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>GIVE YOURSELF A HEAD START</h3>
                        <p>It pays to know the basics before your first lesson. The chances are that someone close to you owns a car</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={secondImg}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>LISTEN TO YOUR INSTRUCTOR</h3>
                        <p>Professional driving instructors know exactly what examiners look for during a practical driving test. </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={thirdImg}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>USE WHAT YOU HAVE LEARNT AFTER YOU PASS</h3>
                        <p>
                            When you pass your test, the learning continues. You’ll face new situations all the time, such as motorways, city centre driving and tight parking.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default MainCarousel;