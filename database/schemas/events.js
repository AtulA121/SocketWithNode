let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let events=new Schema({
    userId : {
            type : Schema.Types.ObjectId,
            ref : "users"
    },
    userName : String,
    game : String,
    discription : String
});

module.exports=mongoose.model("events",events);