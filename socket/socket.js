let socketIO = require('socket.io');
let service=require("../service/service");

let users={};
let sock;

let conn={
    createConnection : async(server)=>{
        let io = socketIO(server);
        io.of("/event").on('connection', async(socket) => {
            sock=socket;
            await secureConn.addUser(socket);
            secureConn.onOpen(socket);
            secureConn.onClose(socket);
            secureConn.onMessage(socket);
        });
    },
    sendMessage : (userId,obj)=>{
        users[userId].emit("message",JSON.stringify(obj));
    },
    getSocketInstance : ()=>{
        return sock;
    },
    removeUser : (userId)=>{
        delete users[userId];
    }
}

let secureConn={
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
    addUser : async(socket)=>{
        let token=socket.handshake.query.token;
        await service.verifyToken(token).then(res=>{
            users[res]=socket;
        });
    }
}

module.exports=conn;