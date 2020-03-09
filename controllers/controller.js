let databaseOperations=require("../database/databaseOperations");
let socketOp=require("../socket/socket");
let socketIs=require("../socket/socket");

let conn={
    getAllData : async(req,res,next)=>{
        conn.sendResponse(res,await databaseOperations.getAllData());
    },
    getData : async(req,res,next)=>{
        socketOp.sendMessage(req.body.userId,{result : "getData : "});
        let result=await databaseOperations.getUserData(req.body);
        conn.sendResponse(res,result);
    },
    registerUser : async(req,res,next)=>{
        let result=await databaseOperations.registerUser(req.body);
        conn.sendResponse(res,result);
    },
    loginUser : async(req,res,next)=>{
        let result=await databaseOperations.verifyUser(req.body);
        conn.sendResponse(res,result);
    },
    deleteData : async(req,res,next)=>{
        socketOp.sendMessage(req.body.userId,{result : "deleteData : "});
        let result=await databaseOperations.deleteData(req.body);
        result = result===1 ? req.body.id : false
        conn.sendResponse(res,result);
    },
    saveUserData : async(req,res,next)=>{
        socketOp.sendMessage(req.body.userId,{result : "saveUserData : "});
        let result=await databaseOperations.saveUserData(req.body);
        conn.sendResponse(res,result);
    },
    createEvent : async(req,res,next)=>{
        socketOp.sendMessage(req.body.userId,"createEvent : ");
        let result=await databaseOperations.createEvent(req.body);
        conn.sendResponse(res,result);
    },
    logoutUser : (req,res,next)=>{
        socketIs.removeUser(req.body.userId);
        conn.sendResponse(res,true);
    },
    sendResponse : (res,result)=>{
        res.send({
            result : result
        });
    }
}

module.exports=conn;