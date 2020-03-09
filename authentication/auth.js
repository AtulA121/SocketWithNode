let jwt=require('jsonwebtoken');
let constants=require("../service/constants");

let conn={
    verifyToken : async(req,res,next)=>{
        let token=req.headers[constants.authtoken];
        if(token){
            jwt.verify(token, constants.jwtKey, (err, verifiedJwt) => {
                if(err){
                    conn.verifyFailed(req,res,next);
                }else{
                    req.body.userId=verifiedJwt.userId;
                    next();
                }
            });
        }else{
            conn.verifyFailed(req,res,next);
        }
    },
    verifyFailed : (req,res,next)=>{
        res.send({
            result : false
        });
    }
};

module.exports=conn;