const express = require('express');
const router = express.Router();
const {getInfo, getAppointments, getTests, getInstructors , getStudents, addUser, editUser, getAllInstructors,
    addTestResult, getVehicles, postAppointment, subStudentWithInstructor, getInstructorsWithOutMe, deleteTest,
    deleteAppointment
} = require('../controllers/users.controller')
const {signUpForUser, editForUser, insertTest, insertAppointment, subIns} = require("../validation/user.validation");

const authenticated = require('../../Authentication/middleware/authentication.middleware');
const authorized = require('../../Authentication/middleware/authorization.middleware');
// don't forget the Authentication & Authorization

router.get('/info/:id' , authenticated ,  getInfo)
    .get('/appointments/:id' ,authenticated, getAppointments)
    .get('/tests/:id' ,authenticated, getTests)
    .get('/instructors'  , getAllInstructors)
    .get('/instructors/:id' , authenticated , getInstructors)
    .get('/students/:id' , authenticated , getStudents)
    .post('/user' ,authenticated , authorized('reg_User') , signUpForUser , addUser)
    .patch('/edit/:id' , authenticated , editForUser , editUser)
    .post('/test' , authenticated , authorized('insert_Test'), insertTest , addTestResult)
    .get('/vehicles' , authenticated ,  getVehicles)
    .post('/appointment' , authenticated , authorized('add_appoint'), insertAppointment , postAppointment)
    .post('/instructor/:id' , authenticated , authorized('sub_Ins') , subIns , subStudentWithInstructor)
    .get('/instructors/not/:id' , authenticated , getInstructorsWithOutMe)
    .delete('/test/:id' , authenticated , authorized('insert_Test') , deleteTest)
    .delete('/appointment/:id' , authenticated , authorized('add_appoint') , deleteAppointment)
module.exports = router;