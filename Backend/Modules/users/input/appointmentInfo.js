class AppointmentInfo{
    constructor(student_id , lesson_date , start_time , vehicle_id , instructor_id) {
        this.student_id = student_id;
        this.lesson_date = lesson_date;
        this.start_time = start_time;
        this.vehicle_id = vehicle_id;
        this.instructor_id = instructor_id;
    }
}


module.exports = {
    AppointmentInfo
}