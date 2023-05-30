import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import "./signInPage.css"


function SignInPage(props) {

    const [user , setUser] = useState({});

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setUser(values => ({...values , [name]:value}));

    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/login' , {
            id : user.id,
            password : user.password,
        },{withCredentials: true}).then((res)=>{
                window.location.href = 'http://localhost:3000';
        }).catch((err)=>{
            console.log(err);
        })
    };

    useEffect(()=>{
        if(Cookies.get('token'))
            window.location.href = 'http://localhost:3000';
    } , [])
    return (
         <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div  id="mainDiv-sign" className="card text-white">
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Sign In</h2>
                                        <p className="text-white-50 mb-5">Please enter your login ID and password!</p>
                                        <form onSubmit={handleSubmit} method='post'>
                                            <div className="form-outline form-white mb-4">
                                                <input type="text" name="id" placeholder="ID" id="typeEmailX"
                                                       className="form-control form-control-lg" onChange={handleChange}/>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input name="password" type="password" placeholder="Password" id="typePasswordX"
                                                       className="form-control form-control-lg" onChange={handleChange}/>
                                            </div>

                                            <p className="small mb-5 pb-lg-2">If You Forgot Your Password Contact Us</p>

                                            <button className="btn btn-outline-light btn-lg px-5"  type="submit"><i
                                                className="bi bi-box-arrow-in-right px-2"></i>Sign In</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignInPage;