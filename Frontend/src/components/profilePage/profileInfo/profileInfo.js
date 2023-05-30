import React, {useEffect, useState} from 'react';
import "./profileInfo.css"
import Cookies from "js-cookie";
import axios from "axios";

function ProfileInfo(props) {

    const [user , setUser] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:8000/info/'+Cookies.get('userId') , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            const info = res.data.Information[0];
            setUser({...user , ...info});
        }).catch((err)=>{
            console.log(err);
        })

    } , [])

    return (
        <div className="d-flex justify-content-center align-items-center overflow-scroll" style={{height:"100vh" , boxSizing:"border-box"}}>
            <div className="col-8 m-auto h-50 rounded row " style={{backgroundColor:"#cbedf8"}}>

                <div className="col-lg-3 col-sm-12 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor:"#949393"}}>
                    <div className="h-50  w-100 mx-1 rounded-circle d-flex justify-content-center align-items-center"  id="divOfMainImg">
                        <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" style={{objectFit:"cover" , minWidth:"100%" , maxWidth:"100%"}} className="m-0 p-0 rounded-circle"/>
                    </div>
                </div>

                <div className="col-lg-9  col-sm-12 h-100  p-0 d-flex align-items-center">
                    <ul className="list-group list-group-flush w-100 d-flex h-100 " >

                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold ">ID : </span>
                            <input type="text" disabled name={"ID"} className="form-control bg-white border-0 fs-4 text-capitalize" value={user.user_id}/>
                        </li>

                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold">First Name : </span>
                            <input type="text" disabled name={"firstName"}  className="form-control bg-white border-0 fs-4 text-capitalize" value={user.first_name}/>
                        </li>
                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold">Last Name : </span>
                            <input type="text" disabled name={"lastName"}  className="form-control bg-white border-0 fs-4 text-capitalize" value={user.last_name}/>
                        </li>

                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold">Phone : </span>
                            <input type="text"  disabled name={"phone"}  className="form-control bg-white border-0 fs-5 text-capitalize" value={user.phone}/>
                        </li>

                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold">Address : </span>
                            <input type="text" disabled name={"address"}  className="form-control bg-white border-0 fs-5 text-capitalize" value={user.address}/>
                        </li>

                        <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                            <span className="input-group-text w-25 justify-content-center fw-bold">Gender : </span>
                            <input type="text" disabled name={"gender"}  className="form-control bg-white border-0 fs-5 text-capitalize" value={user.gender}/>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    );
}

export default ProfileInfo;