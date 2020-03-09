let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let user=new Schema({
    userName : String,
    password : String,
    email : String
});

module.exports=mongoose.model("user",user);