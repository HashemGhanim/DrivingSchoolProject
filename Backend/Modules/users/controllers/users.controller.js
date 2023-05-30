const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const  {informationOfUser , appointmentsOfUser , instructorsOfUser , testsOfUser, typeOfUser,
        allOfTests, allOfInstructors , appointmentsOfUserIns , allAppointments ,getListOfStudents,
        signUpForUser, userIsEdited , instructorsForHomePage ,addTestServices, allVehicles, addAppointmentSer,
    checkPKOfLesson , subStuIns, getInstructorsWithOutStudentSer, deleteTestFromDb , checkIfStudentWithInstructor,
    deleteAppFromDb
} = require("../services/users.service");
const {UserSignUpInformation} = require("../input/userSignUpInformation");
const {UserEditInfo} = require("../input/userEditInfo");
const {TestInfo} = require("../input/testInfo");
const {AppointmentInfo} = require("../input/appointmentInfo");
const {StudentSubInstructor} = require("../input/studentSubInstructor");
const {TOKEN_SECRET} = require("../../main/mainConstant");




const getInfo = async (req , res) => {
    try {
        const user_id = req.params.id;
        const user  = jwt.verify(req.headers.token , TOKEN_SECRET);
        if(user_id != user.userInfo.user_id){
            res.status(422).json({
                error : 'you without access'
            })
        }
        const info = await informationOfUser(user_id);
        res.json({
            Information : info
        })
    }catch (err){
        res.json({
            err : 'user is not exist'
        })
    }
}


const getAppointments = async (req , res)=>{
    try {
        const user_id = req.params.id;

        const user  = jwt.verify(req.headers.token , TOKEN_SECRET);
        if(user_id != user.userInfo.user_id){
            res.status(422).json({
                error : 'you without access'
            })
        }

        const type = await typeOfUser(user_id);


        let info;
        if(type === 3)
            info = await appointmentsOfUser(user_id);
        else if(type === 2)
            info = await appointmentsOfUserIns(user_id);
        else
            info = await allAppointments();
        res.json({
            Appointments : info
        })
    }catch (err){
        res.json({
            err : 'user is not exist'
        })
    }
}


const getTests = async (req , res)=>{
    try {
        const user_id = req.params.id;

        const user  = jwt.verify(req.headers.token , TOKEN_SECRET);
        if(user_id != user.userInfo.user_id){
            res.status(422).json({
                error : 'you without access'
            })
        }

        const type = await typeOfUser(user_id);

        let info;

        if(type === 3)
            info = await testsOfUser(user_id);
        else if(type === 1)
            info = await allOfTests();
        res.json({
            Tests : info
        })
    }catch (err){
        res.json({
            err : 'user is not exist'
        })
    }
}

const getInstructors = async (req , res)=>{
    try{
        const user_id = req.params.id;

        const user  = jwt.verify(req.headers.token , TOKEN_SECRET);
        if(user_id != user.userInfo.user_id){
            res.status(422).json({
                error : 'you without access'
            })
        }

        const type = await typeOfUser(user_id);

        let info;
        if(type === 3)
            info = await instructorsOfUser(user_id);
        else if(type === 1)
            info = await allOfInstructors();

        res.json({
            Instructors : info
        })
    }catch (err){
        res.json({
            err : 'user is not exist'
        })
    }
}

const getAllInstructors = async (req , res)=>{
    const info = await instructorsForHomePage();

    res.json({
        instructors : info
    })
}

const getStudents = async (req , res)=>{
    const user_id = req.params.id;
    const type = await typeOfUser(user_id);

    const info = await getListOfStudents(user_id , type);

    res.json({
        students:info
    })
}


const addUser = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('hashsh');
        res.status(422).json({
            error:errors.array()
        })
    }
    else{
         const {id , firstName , lastName , phone , address , gender , password , group_id} = req.body;

         const user = new UserSignUpInformation(id , firstName , lastName , phone , address , gender , password , group_id);

         const isCreatedUser = await signUpForUser(user);

         res.json({
             isCreated : isCreatedUser
         })
    }
}


const editUser = async(req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            error : errors.array()
        })
    }else{
        const user_id = req.params.id;
        const {lastName , phone , address} = req.body;

        const user = new UserEditInfo(lastName , phone , address);

        const userEdited = await userIsEdited(user , user_id);


        res.json({
            isUpdated : userEdited
        })
    }
}



const addTestResult = async (req , res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            error : errors.array()
        })
    }else{
        const {student_id , test_date , result , type_of_test} = req.body;
        const test = new TestInfo(student_id , test_date , result , type_of_test);
        const ans = await addTestServices(test);

        res.json({
            test : ans
        })
    }
}

const getVehicles = async (req , res)=>{
    const vehicles = await allVehicles();

    res.json({
        all_vehicles : vehicles
    })
}


const postAppointment = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            error : errors.array()
        });
    }else{
        const {student_id , lesson_date , start_time , vehicle_id , instructor_id} = req.body;
        const appoint = new AppointmentInfo(student_id , lesson_date , start_time , vehicle_id , instructor_id);

        try{
            const ifVisible = await checkIfStudentWithInstructor(appoint.instructor_id , appoint.student_id);
            if(ifVisible.length > 0){
                const er = await checkPKOfLesson(appoint.lesson_date , appoint.start_time , appoint.vehicle_id);
                const result = await addAppointmentSer(appoint);

                res.json({
                    result : result
                })
            }else{
                res.status(422).json({
                    err : 'student is not exit'
                })
            }
        }catch (err){
            res.json({
                error : err
            })
        }
    }
}

const subStudentWithInstructor = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            error : errors.array()
        });
    }else{
        const student_id = req.params.id;
        const {instructor_id} = req.body

        const subscribe = new StudentSubInstructor(student_id , instructor_id);

        const result = await subStuIns(subscribe);

        res.json({
            result : result
        })
    }
}


const getInstructorsWithOutMe = async (req , res)=>{
    const student_id = req.params.id;

    const result = await getInstructorsWithOutStudentSer(student_id);


    res.json({
        result : result
    })
}

const deleteTest = async (req , res)=>{
    const id = req.params.id;

    try{
        const result = await deleteTestFromDb(id);
        res.json({
            result : result
        })
    }catch (e){
        res.json({
            error:e
        })
    }

}


const deleteAppointment = async(req , res)=>{
    const id = req.params.id;
    try{

        const isDeleted = await deleteAppFromDb(id);
        res.json({
            isDeleted : isDeleted
        })
    }catch (err){
        res.status(422).json({
            error : err
        })
    }
}
module.exports = {
    getInfo,
    getAppointments,
    getTests,
    getInstructors,
    getStudents,
    addUser,
    editUser,
    getAllInstructors,
    addTestResult,
    getVehicles,
    postAppointment,
    subStudentWithInstructor,
    getInstructorsWithOutMe,
    deleteTest,
    deleteAppointment
}