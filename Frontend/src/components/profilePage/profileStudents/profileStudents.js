import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

function ProfileStudents(props) {


    const [loading , setLoading] = useState(true);
    const [infoStu , setInfoStu] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/students/'+Cookies.get('userId') , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            const info = res.data.students;
            for(let i = 0 ; i < info.length; i++){
                infoStu.push(<tr className="fw-bold text-capitalize">
                    <td>{i + 1}</td>
                    <td>{info[i].student_id}</td>
                    <td>{info[i].first_name} {' '} {info[i].last_name}</td>
                    <td>{info[i].phone}</td>
                    <td>{info[i].address}</td>
                    <td>{info[i].gender}</td>
                </tr>);
            }
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })

    } , []);

    return (
        <div className="overflow-scroll" style={{height:"100vh" , fontSize:"20px"}}>
            <div className="fw-bold fs-2 text-center py-2 text-white" style={{backgroundColor:"#565555"}}> Students</div>
            <div>
                <Table striped bordered hover variant="#cbedf8">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Gender</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? null : infoStu}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProfileStudents;