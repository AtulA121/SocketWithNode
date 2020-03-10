let socketIO = require('socket.io');
let service=require("../service/service");

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
        socket.on("disconnect",async(data)=>{
            let token=socket.handshake.query.token;
            await service.verifyToken(token).then(res=>{
                conn.removeUser(res);
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
        await service.verifyToken(token).then(res=>{
            users[res]=socket;
        });
    },
    removeUser : (userId)=>{
        delete users[userId];
    }
}

module.exports=conn;