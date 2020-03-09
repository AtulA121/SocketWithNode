let express=require("express");
let app=express();
let cors=require("cors");
let socket=require("./socket/socket");
let bodyParser=require("body-parser");
let router=require("./router/router");
let db=require("./database/connection");
let constants=require("./service/constants");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

db.connect(constants.db);

let server=app.listen(constants.port,()=>{
    console.log("server listen on 3000...");
});

socket.createConnection(server);
module.exports=server;