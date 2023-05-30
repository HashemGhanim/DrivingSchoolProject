import React, {useLayoutEffect, useRef , useEffect} from 'react';
import "./courseElement.css"

function CourseElement(props) {

    const ref = useRef();
    useLayoutEffect(()=>{
        ref.current.style.backgroundImage = `url('${props.imgUrl}')`;
    },[])

    return (
        <>
            <div className="d-flex  m-3 shadow-lg bg-white rounded" style={{height:"40vh"}}>
                <div className="col-8 m-3 rounded overflow-scroll" style={{backgroundColor:"#faeef6"}}>
                    <div className="fs-2 p-2 fw-bold">{props.title}</div>
                    <div className="p-2  fs-5">
                        {props.text}
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <a href={props.readmore} target="_blank" className="btn btn-outline-secondary mx-2 my-2"> Read More <i
                            className="bi bi-caret-right-fill"></i></a>
                    </div>
                </div>
                <div className="col-3 m-3 rounded overflow-scroll" id="imgFor" ref={ref}>
                </div>
            </div>
        </>
    );
}

export default CourseElement;