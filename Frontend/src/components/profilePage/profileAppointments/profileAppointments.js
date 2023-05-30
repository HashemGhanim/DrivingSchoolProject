import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap'
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ProfileAppointments(props) {
    const MySwal = withReactContent(Swal);
    const [loading , setLoading] = useState(true);
    const [infoApp , setInfoApp] = useState([]);
    const [loadingForApp , setLoadingForApp] = useState(true);
    const [appointment , setAppointment] = useState({
        instructor_id : Cookies.get('userId')
    });
    const [cars , setCars] = useState([]);

    const handleDelete = (id)=>{
        axios.delete('http://localhost:8000/appointment/' + id , {
            headers:{
                token : Cookies.get('token')
            }
        }).then((res)=>{
            window.location.href='http://localhost:3000/profile/appointments';
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you can not delete this appointment !'
            });
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/appointments/'+Cookies.get('userId') , {
            headers : {
                token : Cookies.get('token')
            }
        }).then((res)=>{
            const info = res.data.Appointments;
            if(infoApp.length === 0){
                for(let i = 0 ; i < info.length; i++){
                    infoApp.push(<tr className="fw-bold text-capitalize">
                        <td>{i + 1}</td>
                        <td>{info[i].instructor_id}</td>
                        <td>{info[i].first_name} {' '} {info[i].last_name}</td>
                        <td>{info[i].student_id}</td>
                        <td>{info[i].vehicle_name} {' '} {info[i].vehicle_model}</td>
                        <td>{info[i].lesson_date}</td>
                        <td>{'At -> ' + info[i].start_time}</td>
                        {Cookies.get('token') && Cookies.get('groupId') === "2" && <td>
                            <button className="btn btn-danger" onClick={()=>handleDelete(info[i].id)}>Delete</button>
                        </td>}

                    </tr>);
                }
                setLoading(false);
            }
        }).catch((err)=>{
            console.log(err);
        })

    } , []);

    useEffect(()=>{
        axios.get('http://localhost:8000/vehicles' , {
            headers:{
                token:Cookies.get('token')
            }
        }).then((res)=>{
            if(cars.length === 0){
                const info = res.data.all_vehicles;
                for(let i = 0 ; i < info.length; i++){
                    cars.push(
                        <option value={info[i].vehicle_id}>{info[i].vehicle_name}{' '}{info[i].vehicle_model}</option>
                    )
                }
                setLoadingForApp(false);
            }
        }).catch((err)=>{

        })
    } , [])

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setAppointment(values => ({...values , [name]:value}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/appointment' , appointment , {
            headers :{
                token:Cookies.get('token')
            }
        }).then((res)=>{
            window.location.href='http://localhost:3000/profile/appointments';
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Appointment does not completed !'
            });
        })
    }

    const appointmentForm = ()=>{
        return (
            <div className="py-2">

                <form onSubmit={handleSubmit} method="post">
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Student ID" name="student_id" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" placeholder="Enter Date" name="lesson_date" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <input type="time" className="form-control" placeholder="Enter Time " name="start_time" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <select className="form-select" name="vehicle_id" onChange={handleChange}>
                                <option selected disabled>Choose Car</option>
                                {loadingForApp ? null : cars}
                            </select>
                        </div>
                        <div className="col">
                            <button type="submit" className="w-100 btn btn-success"> + Add </button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }

    return (
        <div className="overflow-scroll" style={{height:"100vh" , fontSize:"20px"}}>
            <div className="fw-bold fs-2 text-center py-2 text-white" style={{backgroundColor:"#565555"}}> Appointments</div>

            {Cookies.get('groupId') === "2" && appointmentForm()}

            <div>
                <Table striped bordered hover variant="#cbedf8">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Instructor ID</th>
                        <th>Instructor Name</th>
                        <th>Student ID</th>
                        <th>Vehicle</th>
                        <th>Date</th>
                        <th>Description</th>
                        {Cookies.get('token') && Cookies.get('groupId') === "2" && <th>Delete</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? null : infoApp}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProfileAppointments;