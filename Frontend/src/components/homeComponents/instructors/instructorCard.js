import React from 'react';
import "./instructorCard.css"
import mainImg from "./img_avatar1.png"
function InstructorCard(props) {

    return (

            <div className="d-flex col-4 rounded shadow bg-white m-3 justify-content-center" style={{boxSizing:"border-box" , position:"relative"}}>
                <div className="col-8 m-3 rounded" id="mainCardIns">

                    <div className="card">
                        <img className="card-img-top" src={mainImg}
                             alt="Card image" style={{width:"width:100%"}}/>
                            <div className="card-body">
                                <h3 className="card-title fw-bold text-capitalize">{props.name}</h3>
                                <h4 className="card-title text-capitalize">Address : {props.address}</h4>
                                <h5 className="card-title text-capitalize">Phone  : {props.phone}</h5>
                                <h6 className="card-title text-capitalize">Gender : {props.gender}</h6>
                            </div>
                    </div>
                </div>

            </div>
    );
}

export default InstructorCard;