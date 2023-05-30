import React, {useEffect, useState , memo} from 'react';
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";


function ProfileTests() {
    const [loading , setLoading] = useState(true);
    const [infoTest , setInfoTest] = useState([]);
    const [isErr , setIsErr] = useState(false);


    const handleDelete =  (id)=>{
        axios.delete('http://localhost:8000/test/' + id , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            window.location.href='http://localhost:3000/profile/tests';
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/tests/'+Cookies.get('userId') , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            console.log(res);
            const info = res.data.Tests;
            if(infoTest.length === 0){
                for(let i = 0 ; i < info.length ; i++){
                    infoTest.push(<tr className="fw-bold text-capitalize">
                        <td>{i + 1}</td>
                        <td>{info[i].student_id}</td>
                        <td>{info[i].first_name} {' '} {info[i].last_name}</td>
                        <td>{info[i].test_date}</td>
                        <td>{info[i].type_of_test}</td>
                        <td>{
                            info[i].result === 0 ? (<div className="d-flex align-items-center">
                                <div className="rounded-circle bg-danger" style={{width:"20px" , height:"20px"}}></div>
                            </div>) : (<div className="d-flex align-items-center">
                                <div className="rounded-circle bg-success" style={{width:"20px" , height:"20px"}}></div>
                            </div>)
                        }</td>
                        {Cookies.get('token') && Cookies.get('groupId') === "1" && <td>
                            <button className="btn btn-danger" onClick={()=>handleDelete(info[i].id)}> Delete </button>
                        </td>}
                    </tr>);
                }
            }
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })

    } , []);

    const [test , setTest] = useState({});

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setTest(values => ({...values , [name]:value}));
    }

    const handleSubmited = (e)=>{
        e.preventDefault();

        console.log(test);
        axios.post('http://localhost:8000/test' , test , {
            headers: {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            setInfoTest([]);
            setIsErr(false);
            window.location.href = 'http://localhost:3000/profile/tests';
        }).catch((err)=>{
            setIsErr(true);
            console.log(err);
        })
    }

    const testForm = ()=>{
        return (
            <div className="py-2">

                <form method="post" onSubmit={handleSubmited}>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Student ID" name="student_id" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" name="test_date" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <select className="form-select" name="result" onChange={handleChange}>
                                <option selected disabled>select option</option>
                                <option value="1">Success</option>
                                <option value="0">Fail</option>
                            </select>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Type of Test" name="type_of_test" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <button type="submit" className="w-100 btn btn-success"> + Add </button>
                        </div>
                    </div>
                </form>
                {isErr && <div className="text-danger text-center"> You can not add test check the input please </div>}
            </div>
        )
    }

    return (
        <div className="overflow-scroll" style={{height:"100vh" , fontSize:"20px"}}>
            <div className="fw-bold fs-2 text-center py-2 text-white" style={{backgroundColor:"#565555"}}>Tests</div>
            {Cookies.get('groupId') === "1"&& testForm()}
            <div>
                <Table striped bordered hover variant="#cbedf8">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Test Date</th>
                        <th>Test Type</th>
                        <th>Result</th>
                        {Cookies.get('token') && Cookies.get('groupId') === "1" && <th>Delete</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? null : infoTest}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default memo(ProfileTests);