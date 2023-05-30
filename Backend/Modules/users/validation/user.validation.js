const {check} = require('express-validator');
const {knex} = require('../../../collectionDB/coolectionDB');
const {USERS, STUDENTS, LESSONS, INSTRUCTORS} = require("../../main/mainConstant");

const id = check('id' , 'ID is required').notEmpty().custom(async (value)=>{

    if(value.length != 9)
        return Promise.reject("id should be 9 digits");

    const user = await knex.select('*').from(USERS).where('user_id' , value);

    if(user.length > 0)
        return Promise.reject("ID is already Taken");
    else
        return Promise.resolve();
});

const firstName = check('firstName' , 'first Name is required').notEmpty();

const lastName = check('lastName' , 'last Name is required').notEmpty();

const phone = check('phone' , 'phone is required').notEmpty().custom(async (value)=>{
    if(value.length < 10)
        return Promise.reject("Phone Number should be 10 Digits");
    else
        return Promise.resolve();
});

const password = check('password' , 'password is required').notEmpty().custom(async (value)=>{
    if(value.length < 6)
        return Promise.reject("Password should be more than 6");
    else
        return Promise.resolve();
});

const gender = check('gender' , 'gender must be filled').notEmpty();


const idForTest = check('student_id' , 'ID is required').notEmpty().custom(async (value)=>{
    const isExist = await knex.select('*').from(STUDENTS).where('student_id' , value);

    if(isExist.length === 0)
        return Promise.reject('ID is not correct (Does not exist)');
    else
        return Promise.resolve();
});

const date = check('test_date' , 'date is required').notEmpty().custom(async (value)=>{
        const currentDate = new Date();
        const curDate = currentDate.toLocaleDateString('en-GB');
        let dd = curDate[0]+curDate[1];
        let yy1 = value[0] + value[1] + value[2] + value[3];

        let mm = curDate[3]+curDate[4];
        let mm1 = value[5] + value[6];

        let yy = curDate[6]+curDate[7]+curDate[8]+curDate[9];
        let dd1 = value[8] + value[9];

        if(yy <= yy1 && mm <= mm1 && dd < dd1) return Promise.reject('date should be in past');
        else
            return Promise.resolve();
});




const dateForAppointment = check('lesson_date' , 'date is required').notEmpty().custom(async (value)=>{
    const currentDate = new Date();
    const curDate = currentDate.toLocaleDateString('en-GB');
    let dd = curDate[0]+curDate[1];
    let yy1 = value[0] + value[1] + value[2] + value[3];

    let mm = curDate[3]+curDate[4];
    let mm1 = value[5] + value[6];

    let yy = curDate[6]+curDate[7]+curDate[8]+curDate[9];
    let dd1 = value[8] + value[9];

    console.log(curDate);
    console.log(value);
    if(yy >= yy1 && mm >= mm1 && dd > dd1) return Promise.reject('date should be in future');
    else
        return Promise.resolve();
});


const idForInstructor = check('instructor_id' , 'should be filled').notEmpty().custom(async (value)=>{
    const num = await knex(INSTRUCTORS).select('*').where('instructor_id' , value);

    if(num.length <= 0)
        return Promise.reject('Instructor is not exist');
    else
        return Promise.resolve();
})


const signUpForUser = [
    id ,
    firstName,
    lastName,
    phone,
    password,
    gender
];

const editForUser = [
    lastName,
    phone,
]


const insertTest = [
    idForTest,
    date
];



const insertAppointment=[
    idForTest,
    dateForAppointment
];


const subIns = [
    idForInstructor
];
module.exports= {
    signUpForUser,
    editForUser,
    insertTest,
    insertAppointment,
    subIns
}