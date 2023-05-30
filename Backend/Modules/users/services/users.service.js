const {knex} = require('../../../collectionDB/coolectionDB');
const {STUDENTS, INSTRUCTORS, INSTRUCTOR_LESSON, LESSONS, STUDENT_TEST, TEST, INSTRUCTOR_STUDENT , USERS, VEHICLES} = require("../../main/mainConstant");


const typeOfUser = async (user_id)=>{
    const type = await knex.select('group_id').from(USERS).where('user_id' , user_id);
    return type[0].group_id;
}

const informationOfUser = async (user_id)=>{
    const info = await knex.select('*').from(USERS).where('user_id' , user_id);
    return info;
}

const appointmentsOfUser = async (user_id)=>{
    const info = await knex.raw('SELECT * FROM vehicles JOIN(instructors JOIN (instructor_lesson JOIN lessons  USING (lesson_date , start_time , vehicle_id)) USING (instructor_id))  USING (vehicle_id) WHERE student_id = ?' , user_id);
    return info[0];
}

const appointmentsOfUserIns = async (user_id)=>{
    const info = await knex.raw('SELECT * FROM vehicles JOIN(instructors JOIN (instructor_lesson JOIN lessons  USING (lesson_date , start_time , vehicle_id)) USING (instructor_id))  USING (vehicle_id) WHERE instructor_id = ?' , user_id);
    return info[0];
}

const allAppointments = async ()=>{
    const info = await knex.select( '*').from(INSTRUCTORS +' AS i').join(INSTRUCTOR_LESSON + ' AS il', 'i.instructor_id' , 'il.instructor_id').join(LESSONS + ' AS l' , function (){
        this
            .on('il.lesson_date' , '=' , 'l.lesson_date')
            .on('il.start_time' , '=' , 'l.start_time')
            .on('il.vehicle_id' , '=', 'l.vehicle_id')
    }).join(VEHICLES + ' AS v' , 'v.vehicle_id' , 'l.vehicle_id');

    return info;
}

const testsOfUser = async (user_id)=>{
    const info = await knex.select('*').from(STUDENTS +' AS si').join(STUDENT_TEST + ' AS st' , 'st.student_id' , 'si.student_id').leftJoin(TEST + ' AS t'
        , 't.test_date' , 'st.test_date').where('si.student_id' , user_id);
    return info;
}

const instructorsOfUser = async (user_id)=>{
    const info = await knex.select('*').from(STUDENTS + ' AS si').join(INSTRUCTOR_STUDENT + ' AS iss' , 'si.student_id' , 'iss.student_id').leftJoin(INSTRUCTORS + ' AS i' , 'i.instructor_id' , 'iss.instructor_id').where('si.student_id' ,user_id);

    return info;
}

const allOfTests = async ()=>{
    const info = await knex.select('*').from(STUDENTS + ' AS s').
        leftJoin(STUDENT_TEST + ' AS st' , 'st.student_id' , 's.student_id')
        .leftJoin(TEST + ' AS t'
        , 't.test_date' , 'st.test_date').whereNotNull('st.student_id');
    return info;
}

const allOfInstructors = async()=>{
    const info = await knex.select('*').from(INSTRUCTORS);
    return info;
}



const instructorsForHomePage = async ()=>{
    const info = await knex.select('first_name' , 'last_name' , 'phone' , 'address' , 'gender').from(INSTRUCTORS);
    return info;
}


const getListOfStudents = async (user_id , type)=>{
    console.log(typeof type)
    if(type === 2){
            const info = await knex.select('*').from(STUDENTS + ' AS s').leftJoin(INSTRUCTOR_STUDENT + ' AS is' , 'is.student_id' , 's.student_id').where('is.instructor_id' , user_id);
            return info;
    }else{
            const info = await knex.select('*').from(STUDENTS);
            return info;
    }
}


const signUpForUser = async (user) =>{
    const isCreated = await knex(USERS).insert({
        user_id : user.id,
        first_name : user.firstName,
        last_name : user.lastName,
        phone : user.phone,
        address : user.address,
        group_id : user.group_type,
        password : user.password,
        gender : user.gender
    })

    if(user.group_type == '2'){
        const isInsCreated = await knex(INSTRUCTORS).insert({
            instructor_id : user.id,
            first_name : user.firstName,
            last_name : user.lastName,
            phone : user.phone,
            address : user.address,
            gender : user.gender
        })
    }else {
        const isStuCreated = await knex(STUDENTS).insert({
            student_id : user.id,
            first_name : user.firstName,
            last_name : user.lastName,
            phone : user.phone,
            address : user.address,
            gender : user.gender
        })
    }

    return isCreated;
}




const userIsEdited = async (user , user_id)=>{
    const isUpdated = await knex(USERS).where('user_id' , user_id).update({
        last_name : user.lastName,
        phone : user.phone,
        address : user.address
    });

    const type = await typeOfUser(user_id);


    if(type == '2'){
        const isUpdatedIns = await knex(INSTRUCTORS).where('instructor_id' , user_id).update({
            last_name : user.lastName,
            phone : user.phone,
            address : user.address
        });
    }
    else if(type == '3'){
        const isUpdatedStu = await knex(STUDENTS).where('student_id' , user_id).update({
            last_name : user.lastName,
            phone : user.phone,
            address : user.address
        });
    }
    return isUpdated;
}


const addTestServices = async (test)=>{
    const dateIsExist = await knex(TEST).select('*').where('test_date' , test.test_date);

    if(dateIsExist.length == '1'){
        const addTest = await knex(STUDENT_TEST).insert({
            test_date : test.test_date,
            student_id : test.student_id,
            result : test.result,
            type_of_test : test.type_of_test
        });

        const updateDate = await knex(TEST).select('*').where('test_date' , test.test_date);
        let numOfTests = parseInt(updateDate[0].number_of_tests);
        let numOfPassed = parseInt(updateDate[0].passed);

        if(test.result == '1'){
            numOfTests = numOfTests + 1;
            numOfPassed = numOfPassed + 1;

            const updateDateNow = await knex(TEST).where('test_date' , test.test_date).update({
                number_of_tests : numOfTests,
                passed : numOfPassed
            });
        }else{
            numOfTests = numOfTests + 1;
            numOfPassed = numOfPassed;

            const updateDateNow = await knex(TEST).where('test_date' , test.test_date).update({
                number_of_tests : numOfTests,
                passed : numOfPassed
            });
        }
    }else{
        const addAtTest = await knex(TEST).insert({
            test_date : test.test_date,
            number_of_tests : '1',
            passed : test.result
        })

        const addTest = await knex(STUDENT_TEST).insert({
            test_date : test.test_date,
            student_id : test.student_id,
            result : test.result,
            type_of_test : test.type_of_test
        });
    }
    return dateIsExist;
}


const allVehicles = async ()=>{
    const vehicles = await knex(VEHICLES).select('*');

    return vehicles;
}


const addAppointmentSer = async (appoint) =>{

    const result = await knex(LESSONS).insert({
        lesson_date : appoint.lesson_date,
        start_time : appoint.start_time,
        vehicle_id : appoint.vehicle_id,
        student_id : appoint.student_id
    });

    const resultAtBet = await knex(INSTRUCTOR_LESSON).insert({
        instructor_id : appoint.instructor_id,
        lesson_date : appoint.lesson_date,
        start_time : appoint.start_time,
        vehicle_id : appoint.vehicle_id
    });

    return resultAtBet;
}


const checkPKOfLesson = async (lesson_date , start_time , vehicle_id)=>{
    try{
        knex(LESSONS).insert({
            lesson_date : lesson_date,
            start_time : start_time,
            vehicle_id : vehicle_id
        });
    }catch (err){
         return err;
    }
}

const checkIfStudentWithInstructor = async (instructor_id , student_id)=>{
    const info = await knex.select('*').from(INSTRUCTOR_STUDENT).where('instructor_id' , instructor_id).where('student_id' , student_id);

    return info;
}

const subStuIns = async (subscribe)=>{
    const num = await knex(INSTRUCTOR_STUDENT).select('*').where('student_id' , subscribe.student_id).where('instructor_id' , subscribe.instructor_id);

    if(num.length > 0)
        return "already taken";
    else{
        const sub = await knex(INSTRUCTOR_STUDENT).insert({
            instructor_id : subscribe.instructor_id,
            student_id : subscribe.student_id
        })

        return Promise.resolve();
    }
}


const getInstructorsWithOutStudentSer = async (student_id)=>{
    const result = await knex.select('i.instructor_id' , 'i.first_name' , 'i.last_name').from(INSTRUCTORS + ' AS i').leftOuterJoin(
         knex.select('*').from(INSTRUCTOR_STUDENT).where('student_id' , student_id).as('s')
    , 'i.instructor_id' , 's.instructor_id').whereNull('student_id');
    return result;
}


const deleteTestFromDb = async (test_id)=>{
    const result = await knex(STUDENT_TEST).where('id' , test_id).del();

    return result;
}

const deleteAppFromDb = async (id)=>{
    const info = await knex(INSTRUCTOR_LESSON).where('id' , id).select('*');
    const result = await knex(INSTRUCTOR_LESSON).where('id' , id).del();
    const resultFromLesson = await knex(LESSONS).where('lesson_date' , info[0].lesson_date).where('start_time' , info[0].start_time).where('vehicle_id' , info[0].vehicle_id).del();
    return resultFromLesson && result;
}
module.exports = {
    informationOfUser,
    appointmentsOfUser,
    testsOfUser,
    instructorsOfUser,
    typeOfUser,
    allOfTests,
    allOfInstructors,
    appointmentsOfUserIns,
    allAppointments,
    getListOfStudents,
    signUpForUser,
    userIsEdited,
    instructorsForHomePage,
    addTestServices,
    allVehicles,
    addAppointmentSer,
    checkPKOfLesson,
    subStuIns,
    getInstructorsWithOutStudentSer,
    deleteTestFromDb,
    checkIfStudentWithInstructor,
    deleteAppFromDb
};