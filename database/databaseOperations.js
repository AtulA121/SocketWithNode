let jwt=require('jsonwebtoken');
let mongoose=require("mongoose");
let userSchema=require("./schemas/user");
let eventsSchema=require("./schemas/events");
let constants=require("../service/constants");

module.exports={
    registerUser : async(obj)=>{
        let userObj={
            email : obj.email,
            password : obj.password,
            userName : obj.userName
        }
        let res=await userSchema.collection.insert(userObj);
        return res.result.ok;
    },
    getAllData : async()=>{
        let res=await eventsSchema.collection.find({}).toArray();
        return res;
    },
    createEvent : async(obj)=>{
        let eventObj=new eventsSchema({
            userId : obj.userId,
            userName : obj.userName,
            game : obj.game,
            discription : obj.discription
        });
        let res=await eventsSchema.collection.insert(eventObj);
        return res;
    },
    verifyUser : async(obj)=>{
        let result;
        let res=await userSchema.findOne({
            $and : [
                {
                    email : obj.email
                },
                {
                    password : obj.password
                }
            ]
        });
        if(res){
            let token=jwt.sign({userId : res._id},constants.jwtKey,{});
            result={};
            result.token=token;
        }
        return result;
    },
    getUserData : async(obj)=>{
        let res=await eventsSchema.collection.find({
            userId : mongoose.Types.ObjectId(obj.userId)
        }).toArray();
        return res;
    },
    deleteData : async(obj)=>{
        let res=await eventsSchema.collection.remove({
            _id : mongoose.Types.ObjectId(obj.id)
        });
        return res.result.ok;
    },
    saveUserData : async(obj)=>{
        let res=await eventsSchema.collection.update({
            _id : mongoose.Types.ObjectId(obj.id)
        },{
            $set : {
                userName : obj.userName,
                game : obj.game,
                discription : obj.discription
            }
        });
        return obj;
    }
}