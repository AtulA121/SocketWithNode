let users={};
let socketOp=require("../socket/socket");

module.exports={
    sendMessage : (userId,data)=>{
        console.log("------------ : ",userId+" , "+users[userId]);
        // socketOp.sendMessage(users[userId],data);
    },
    getUsers : ()=>{
        return users;
    }
}