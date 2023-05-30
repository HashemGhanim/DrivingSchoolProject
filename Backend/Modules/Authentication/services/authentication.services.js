const {knex} = require('../../../collectionDB/coolectionDB');
const {USERS} = require("../../main/mainConstant");


const isSignedIn = async (user)=>{
    const result = await knex.select('*').from(USERS).where('user_id' , user.id).where('password' , user.password);
    return result;
}


module.exports = {
    isSignedIn
}