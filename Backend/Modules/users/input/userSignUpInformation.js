class UserSignUpInformation{
    constructor(id , firstName , lastName , phone , address , gender , password, group_type) {
        this.id = id;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.password = password;
        this.group_type = group_type;
    }
}

module.exports = {
    UserSignUpInformation
}