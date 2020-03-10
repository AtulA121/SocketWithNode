let jwt=require('jsonwebtoken');
let constants=require("../service/constants");

let conn={
    verifyToken : async(token)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token, constants.jwtKey, async(err, verifiedJwt) => {
                console.log(verifiedJwt);
                if(err){
                    reject(err);
                }else{
                    resolve(verifiedJwt.userId);
                }
            });
        });
    }
}

module.exports=conn;
