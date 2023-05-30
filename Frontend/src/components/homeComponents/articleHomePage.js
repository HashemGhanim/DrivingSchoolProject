import React from 'react';
import "./articleHomePage.css"
import { useState, useRef, useEffect } from "react";
import {Card} from "react-bootstrap"
function ArticleHomePage(props) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin: "-400px" }
        );
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isIntersecting]);


    useEffect(() => {
        if (isIntersecting) {
            ref.current.querySelectorAll("div").forEach((el) => {
                el.classList.add("slide-in");
            });
        }
    }, [isIntersecting]);


    return (
        <>
            <main ref={ref}>
                <div style={{overflow:"scroll"}}>
                    <section className="the-front-img"></section>
                    <section className="h-100">
                            <h4 className="p-2 pb-0">Carl Benz</h4>
                            <h5 className="px-2">Karl Friedrich Benz</h5>
                            <p className="px-2 fw-bold">
                                was a German engine designer and automotive engineer. His Benz Patent Motorcar from 1885 is considered the first practical modern automobile and first car put into series production. He received a patent for the motorcar in 1886.
                                <br/><br/>
                                inventor of the modern car, received a written "Genehmigung" (permit) from the Grand Ducal authorities to operate his car on public roads in 1888 after residents complained about the noise and smell of his Motorwagen. Up until the start of the 20th century, European authorities issued similar permits to drive motor vehicles ad hoc, if at all.
                            </p>
                            <a className="btn btn-outline-secondary mx-2" href="https://en.wikipedia.org/wiki/Driver%27s_license#History" target="_blank"> Read More <i className="bi bi-caret-right"></i> </a>
                    </section>
                </div>

                <div>
                    <section className="the-front-img"></section>
                    <section>
                        <h4 className="p-2 pb-0">Traffic Signs</h4>
                        <h5 className="px-2">(Road Signs)</h5>
                        <p className="px-2 fw-bold">
                            signs erected at the side of roads to provide information to road users. Pictorial signs are used as symbols in place of words. As control devices for traffic, signs need full attention, respect and adequate driver's response. There are three basic types of traffic signs
                        </p>
                        <a className="btn btn-outline-secondary mx-2" href="https://mvd.kerala.gov.in/en/traffic-signs" target="_blank"> Read More <i className="bi bi-caret-right"></i> </a>
                    </section>
                </div>
            </main>
        </>
    );
}

export default ArticleHomePage;
