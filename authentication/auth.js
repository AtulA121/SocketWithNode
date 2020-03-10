let constants=require("../service/constants");
let service=require("../service/service");

let conn={
    verifyToken : async(req,res,next)=>{
        let token=req.headers[constants.authtoken];
        if(token){
            service.verifyToken(token).then(res=>{
                req.body.userId=res;
                next();
            }).catch(err=>{
                conn.verifyFailed(res);
            });
        }else{
            conn.verifyFailed(res);
        }
    },
    verifyFailed : (res)=>{
        res.send({
            result : false
        });
    }
};

module.exports=conn;