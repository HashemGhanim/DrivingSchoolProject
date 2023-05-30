import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import NotFound from "../../notFound";
import axios from "axios";

function Setting() {
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

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({...values , [name]:value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.patch('http://localhost:8000/edit/'+ Cookies.get('userId') , {
            lastName : user.last_name,
            phone : user.phone,
            address : user.address
        } , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const contant = ()=>{
        return (
            <>
                <div className="d-flex justify-content-center align-items-center overflow-scroll" style={{height:"100vh"}}>
                    <div className="col-8 m-auto h-50 rounded row" style={{backgroundColor:"#cbedf8"}}>

                        <div className="col-lg-3 col-sm-12  rounded-start d-flex align-items-center justify-content-between flex-column" style={{backgroundColor:"#949393"}}>
                            <div className="h-50  w-100 mx-1 rounded-circle py-4" id="settingOfImg">
                                <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" style={{objectFit:"cover" , minWidth:"100%" , maxWidth:"100%"}} className="m-0 p-0 rounded-circle"/>
                            </div>
                            <div className="py-2">
                                <button className="btn btn-outline-light p-3 w-100" onClick={handleSubmit}>Edit</button>
                            </div>
                        </div>

                        <div className="col-lg-9  col-sm-12 h-100 p-0 d-flex align-items-center">
                            <ul className="list-group list-group-flush w-100 d-flex h-100 " >

                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold ">ID : </span>
                                    <input type="text" disabled className="form-control bg-white border-0" value={user.user_id}/>
                                </li>

                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold">First Name : </span>
                                    <input type="text" disabled className="form-control bg-white border-0" value={user.first_name}/>
                                </li>
                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold">Last Name : </span>
                                    <input type="text" onChange={handleChange} name="last_name" className="form-control bg-white border-0"  placeholder={user.last_name}/>
                                </li>

                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold">Phone : </span>
                                    <input type="text" name="phone"  onChange={handleChange} className="form-control bg-white border-0" placeholder={user.phone}/>
                                </li>

                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold">Address : </span>
                                    <input type="text" name='address' className="form-control bg-white border-0" onChange={handleChange} placeholder={user.address}/>
                                </li>

                                <li className="list-group-item  d-flex" style={{height:"16.6666667%"}}>
                                    <span className="input-group-text w-25 justify-content-center fw-bold">Gender : </span>
                                    <input type="text" disabled className="form-control bg-white border-0" value={user.gender}/>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    useEffect(()=>{
        if(!Cookies.get('token'))
            window.location.href = 'http://localhost:3000/';
    } , [])




    return (
        Cookies.get('token') ? contant() : <NotFound/>
    );
}

export default Setting;