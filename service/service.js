let jwt=require('jsonwebtoken');
let constants=require("../service/constants");

let conn={
    verifyToken : async(token)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token, constants.jwtKey, async(err, verifiedJwt) => {
                if(err){
                    reject(err);
                }
                resolve(verifiedJwt.userId);
            });
        });
    }
}

module.exports=conn;
