import React from 'react';
import CourseElement from "./courseElement";
import "./mainCoursePage.css"

function MainCoursePage(props) {
    return (
        <>
            <div className="d-flex justify-content-center align-content-center h1 my-5" id="courseMainWelcome">Courses offered by the Palestine Driving School 🪪</div>
            <CourseElement imgUrl={require("./courseImages/heavyTruck.jpeg")} text={"A heavy vehicle course is required to drive any vehicle that exceeds 4.5 tonnes gross vehicle mass (GVM). The National Heavy Vehicle Regulator (NHVR) is the sole administrator of the heavy vehicle national law.\n" +
                "                        A heavy truck license allows you to drive all types of vehicles, whether the type of gear is normal or automatic"} title={"Heavy Truck Course"} readmore={"https://en.wikipedia.org/wiki/Semi-trailer_truck"}/>

            <CourseElement title={"Agricultural vehicle course"} text={"Ag Drive provides practical agricultural operator training for vehicles and machinery. As the Waikato's largest agricultural vehicle training provider, we offer a range of tractor driving courses, machinery operation courses and farm motorbike driver courses to suit every experience level, timeframe and need. This license and course allow driving agricultural vehicles only"}
            readmore={"https://en.wikipedia.org/wiki/Agricultural_machinery"} imgUrl={require("./courseImages/Agriculturalvehicle.jpeg")}/>

            <CourseElement title={"Light truck course"} text={"This VicRoads approved course is aimed at those who want a Victorian Light Rigid (LR) Synchromesh driver’s licence. This licence allows you to drive buses, trucks and other rigid vehicles that weigh between 4.5 and 8 tonnes GVM, seating more than 12 adults plus the driver. One-on-one courses will be conducted in your own vehicle and take around 6 hours."}
                           readmore={"https://en.wikipedia.org/wiki/Light_truck"} imgUrl={require("./courseImages/lightTruck.png")}/>

            <CourseElement title={"Special Vehicle Course (Normal Gear)"} text={"A private vehicle with a regular gearbox. The driver's license is taken after several days of intensive training. It is characterized by the presence of gears that are changed by means of the clutch and gearWith this license, you can drive vehicles with both manual and automatic transmissions"} readmore={"https://en.wikipedia.org/wiki/Gear"} imgUrl={require("./courseImages/Gear.jpeg")}/>

            <CourseElement title={"Special Vehicle Course (Automatic Gear)"} text={"The automatic gear course is very easy and only needs a few hours to help the student control the car and the steering wheel. The holder of this type of license is not allowed to drive any regular gear vehicle , The gear change takes place within the engine of the car without the clutch pedal"} readmore={"https://en.wikipedia.org/wiki/Automatic_transmission"} imgUrl={require("./courseImages/automatic-transmission-vehicle.jpg")}/>
        </>
    );
}

export default MainCoursePage;