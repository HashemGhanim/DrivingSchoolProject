import React, {useEffect, useState} from 'react';
import InstructorCard from "./instructorCard";
import Cookies from "js-cookie";
import axios from "axios";
function MainInstructorsPage(props) {

    const [loading , setLoading] = useState(false);
    const [instructors , setInstructors] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8000/instructors').then((res)=>{
            const info = res.data.instructors;
            if(instructors.length === 0){
                for(let i = 0 ; i < info.length; i++){
                    instructors.push(
                        <InstructorCard name={info[i].first_name + ' ' + info[i].last_name} address={info[i].address}
                            phone={info[i].phone} gender={info[i].gender}/>
                    )
                }
                setLoading(true);
            }

        }).catch((err)=>{
            console.log(err);
        })
    } , []);


    return (
        <div className="d-flex flex-wrap justify-content-around overflow-scroll" style={{height:"100vh"}}>
            {loading ? instructors : null}
        </div>
    );
}

export default MainInstructorsPage;