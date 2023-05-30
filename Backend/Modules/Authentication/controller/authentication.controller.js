const {validationResult} = require('express-validator');
const {SignInInfo} = require("../input/signInInfo");
const {isSignedIn} = require("../services/authentication.services");
const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require("../../main/mainConstant");


const signInMethod = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            error : errors.array()
        })
    }else{
        const {id , password} = req.body;

        const user = new SignInInfo(id , password);

        const active = await isSignedIn(user);

        if(active.length){
            const [userInfo] = active;
            const token = jwt.sign({userInfo} , TOKEN_SECRET , {expiresIn: '1h'});

            res.header('Access-Control-Allow-Credentials', true);
            res.cookie('token' , token , {maxAge : 3600000});
            res.cookie('userId' , userInfo.user_id , {maxAge : 3600000});
            res.cookie('groupId' , userInfo.group_id , {maxAge : 3600000});
            res.json({
                message : 'logged in'
            })
            res.send();
        }else{
            res.json({
                result : 'user is invalid'
            })
        }
    }
}

module.exports = {
    signInMethod
}