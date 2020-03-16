let jwt=require('jsonwebtoken');
let constants=require("../service/constants");

let conn={
    verifyToken : async(socket)=>{
        return new Promise((resolve,reject)=>{
            let token=socket.handshake.query.token;
            jwt.verify(token, constants.jwtKey, async(err, verifiedJwt) => {
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
