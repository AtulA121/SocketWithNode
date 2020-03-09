let jwt=require('jsonwebtoken');
let socketIO = require('socket.io');
let constants=require("../service/constants");

let users={};
let sock;

let conn={
    createConnection : async(server)=>{
        let io = socketIO(server);
        io.of("/event").on('connection', async(socket) => {
            sock=socket;
            await conn.addUser(socket);
            conn.onOpen(socket);
            conn.onClose(socket);
            conn.onMessage(socket);
        });
    },
    onOpen : (socket)=>{
        socket.emit("open","connected to server : ");
    },
    onClose : (socket)=>{
        socket.on("disconnect",(data)=>{
            let token=socket.handshake.query.token;
            jwt.verify(token, constants.jwtKey, (err, verifiedJwt) => {
                conn.removeUser(verifiedJwt.userId);
            });
        });
    },
    onMessage : (socket)=>{
        socket.on("message",(data)=>{
            console.log("onMessage : ",JSON.parse(data));
        });
    },
    sendMessage : (userId,obj)=>{
        users[userId].emit("message",JSON.stringify(obj));
    },
    getSocketInstance : ()=>{
        return sock;
    },
    addUser : async(socket)=>{
        let token=socket.handshake.query.token;
        jwt.verify(token, constants.jwtKey, (err, verifiedJwt) => {
            users[verifiedJwt.userId]=socket;
        });
    },
    removeUser : (userId)=>{
        delete users[userId];
    }
}

module.exports=conn;