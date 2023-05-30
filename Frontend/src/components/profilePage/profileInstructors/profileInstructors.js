import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ProfileInstructors(props) {

    const MySwal = withReactContent(Swal);
    const [loadingForIns , setLoadingForIns] = useState(true);
    const [loading , setLoading] = useState(true);
    const [infoIns , setInfoIns] = useState([]);
    const [ins , setIns] = useState([]);
    const [insId , setInsId] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:8000/instructors/not/' + Cookies.get('userId') , {
            headers :{
                token : Cookies.get('token')
            }
        }).then((res)=>{
            if(ins.length === 0){
                const info = res.data.result;

                for(let i = 0 ; i < info.length; i++){
                    ins.push(
                        <option value={info[i].instructor_id}>{info[i].first_name}{' '}{info[i].last_name}</option>
                    )
                }
                setLoadingForIns(false);
            }
        }).catch((err)=>{
            console.log(err);
        })
    } , [])

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInsId(values => ({...values , [name]:value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/instructor/' + Cookies.get('userId') , insId , {
            headers:{
                token : Cookies.get('token')
            }
        }).then((res)=>{
            window.location.href='http://localhost:3000/profile/instructors';
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you can not subscribe with this instructor!'
            });
            console.log(err);
        })
    }

    const insForm = ()=>{
        return (
            <div className="py-2">

                <form method="post" onSubmit={handleSubmit}>
                    <div className="row mx-auto">
                        <div className="col-2"></div>
                        <div className="col-4">
                            <select className="form-select" name="instructor_id" onChange={handleChange}>
                                    <option selected disabled> select instructor </option>
                                {loadingForIns ? null : ins}
                            </select>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="w-100 btn btn-success"> + Subscribe </button>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </form>

            </div>
        )
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/instructors/'+Cookies.get('userId') , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            console.log(res);
            if(infoIns.length === 0){
                const info = res.data.Instructors;
                for(let i = 0 ; i < info.length; i++){
                    infoIns.push(<tr className="fw-bold text-capitalize">
                        <td>{i + 1}</td>
                        <td>{info[i].instructor_id}</td>
                        <td>{info[i].first_name} {' '} {info[i].last_name}</td>
                        <td>{info[i].phone}</td>
                        <td>{info[i].address}</td>
                        <td>{info[i].gender}</td>
                    </tr>);
                }
                setLoading(false);
            }
        }).catch((err)=>{
            console.log(err);
        })

    } , []);



    return (
            <div className="overflow-scroll" style={{height:"100vh" , fontSize:"20px"}}>
                <div className="fw-bold fs-2 text-center py-2 text-white" style={{backgroundColor:"#565555"}}>My Instructors</div>
                {Cookies.get('groupId') === "3" && insForm()}
                <div>
                    <Table striped bordered hover variant="#cbedf8">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Instructor ID</th>
                            <th>Instructor Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? null : infoIns}
                        </tbody>
                    </Table>
                </div>
            </div>
    );
}

export default ProfileInstructors;