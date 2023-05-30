import React, {useEffect, useState} from 'react';
import "./signUp.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import Cookies from "js-cookie";

function SignUpInstructor(props) {

    const [instructor , setInstructor] = useState({
        group_id : 2
    });
    const [isErr , setIsErr] = useState(false);
    const MySwal = withReactContent(Swal);

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInstructor(values => ({...values , [name]:value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(instructor.password === instructor.repeatedPassword){

            if(instructor.gender){

                if(instructor.phone){
                    axios.post('http://localhost:8000/user' , instructor , {
                        headers:{
                            token : Cookies.get('token')
                        }
                    }).then((res)=>{
                        setIsErr(false);

                        Swal.fire({
                            icon: 'success',
                            title: 'Hello... ',
                            text: 'User is Created , Welcome ' + instructor.firstName
                        });
                        console.log(res);
                    }).catch((err)=>{
                        setIsErr(true);
                        console.log(err);
                    })

                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'phone does not filled'
                    });
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'gender does not filled'
                });
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The password does not match'
            });
        }
    }

    return (
        <><section className="vh-100 bg-image  shadow">
            <div className="hello1 mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div id="globalDiv" className="card text-white" style={{borderRadius: "1rem"}}
                                 className="card"
                                 style={{borderRadius: "20px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-3">SIGN UP</h2>




                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4 row-12 ">

                                            <input style={{display: "inline-block", width: "45%"}}  placeholder={"Instructor ID"}
                                                   type="text" id="form3Example1cg"
                                                   className="form-control form-control-lg" name="id" onChange={handleChange}/>
                                        </div>
                                        <div className="form-outline mb-4 row-12 ">
                                            <input style={{display: "inline-block", width: "45%"}} placeholder="First Name"
                                                   type="text" id="form3Example1cg"
                                                   className="form-control form-control-lg" name="firstName" onChange={handleChange}/>

                                            <input style={{display: "inline-block", width: "45%" , marginLeft:"49px"}}
                                                   placeholder="Last Name" type="text" id="form3Example1cg"
                                                   className="form-control form-control-lg" name="lastName" onChange={handleChange}/>
                                        </div>
                                        <div className="col-sm-5 mb-4 d-flex">
                                                <input type="text" className="form-control"
                                                       id="inlineFormInputGroupUsername"
                                                       placeholder="Phone" name="phone" onChange={handleChange}/>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <select className="form-select form-control form-control-lg" aria-label="Default select example" name="gender" onChange={handleChange}>
                                                <option  selected  disabled>Gender</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                            </select>
                                        </div>

                                        <div className="form-outline mb-4" >
                                            <input type="text" placeholder="Address" id="form3Example3cg"
                                                   className="form-control form-control-lg" name="address" onChange={handleChange}/>
                                        </div>
                                        <div className="form-outline mb-3">
                                            <input placeholder="Password" type="password" id="form3Example4cg"
                                                   className="form-control form-control-lg" name="password" onChange={handleChange}/>
                                        </div>
                                        <div className="form-outline mb-3">
                                            <input placeholder="Repeat your password" type="password"
                                                   id="form3Example4cdg"
                                                   className="form-control form-control-lg" name="repeatedPassword" onChange={handleChange}/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
                                        </div>

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

export default SignUpInstructor;