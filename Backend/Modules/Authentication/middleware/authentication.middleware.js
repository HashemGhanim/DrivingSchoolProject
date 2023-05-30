const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require("../../main/mainConstant");

const authenticated = (req , res , next)=>{
    const token = req.headers.token;

    if(token){
        try{
            const user = jwt.verify(token , TOKEN_SECRET);
            next();
        }catch (err){
            res.json({
                error: 'token is expired'
            })
        }

    }else{
        res.json({
            error : 'token is invalid'
        })
    }
}

module.exports = authenticated;