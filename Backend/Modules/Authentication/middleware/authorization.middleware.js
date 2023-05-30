const jwt = require('jsonwebtoken');
const {knex} = require('../../../collectionDB/coolectionDB');
const {TOKEN_SECRET, PERMISSIONS, PERMISSION_GROUP} = require("../../main/mainConstant");


const authorized = (code)=>{
    return async(req , res , next)=>{

        const token = req.headers.token;

        if(token){

            try{
                const user = jwt.verify(token , TOKEN_SECRET);

                const groupId = user.userInfo.group_id;
                const pre = await knex.select('*').from(PERMISSIONS + ' AS p').join(PERMISSION_GROUP + ' AS pg', 'pg.permission_id' , 'p.permission_id').where('pg.group_id' , groupId);


                let flag = false;

                for(let i = 0 ; i < pre.length; i++){
                    if(pre[i].permission_code === code){
                        flag = true;
                        break;
                    }
                }

                if(flag){
                    next();
                }else{
                    res.json({
                        error : 'user without permission'
                    })
                }


            }catch (err){
                console.log(12);
                res.json({
                    error : 'token is expired'
                })
            }




        }else {
            res.json({
                error : 'token is invalid'
            })
        }






    }
}



module.exports = authorized;