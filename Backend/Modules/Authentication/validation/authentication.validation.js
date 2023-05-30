const {check} = require('express-validator');
const {knex} = require('../../../collectionDB/coolectionDB');
const {USERS} = require("../../main/mainConstant");

const id = check('id' , 'you should filled this input').notEmpty().custom(async (value)=>{
    const result = await knex.select('*').from(USERS).where('user_id' , value);

    if(result.length <= 0)
        return Promise.reject('the id of user is invalid');
    else
        return Promise.resolve();
});

const password = check('password' , 'password is required').notEmpty().custom(async (value)=>{
    if(value.length < 6)
        return Promise.reject("Password should be more than 6");
    else
        return Promise.resolve();
});


const signInForUser = [
    id,
    password
];


module.exports = {
    signInForUser
}