let express=require("express");
let app=express();
let cors=require("cors");
let socket=require("./socket/socket");
let bodyParser=require("body-parser");
let router=require("./router/router");
let db=require("./database/connection");
let constants=require("./service/constants");
let searchAlgo=require("./service/searchAlgo");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

async function main(){
    await db.connect(constants.db);
    let arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    let result=await searchAlgo.binarySearch(50,arr);
    console.log("index is : ",result);
}
main();

let server=app.listen(constants.port,()=>{
    console.log("server listen on 3000...");
});

socket.createConnection(server);

module.exports=server;