let user=require("../service/user");
let jwt=require('jsonwebtoken');
let data=require("../service/data");
let constants=require("../service/constants");

module.exports={
    verifyUser : async(obj)=>{
        let result;
        for(let i=0;i<user.length;i++){
            if(await getUser(obj,user[i])){
                let token=jwt.sign({userId : user[i].userId},constants.jwtKey,{});
                result=user[i];
                result.token=token;
            }
        }
        return result;
    },
    deleteData : async(obj)=>{
        let result;
        for(let i=0;i<data.length;i++){
            if(await getData(obj,data[i])){
                data.splice(i,1);
                result=obj.id;
            }
        }
        return result;
        // return Promise.resolve(result);
        // return Promise.reject("error : ");
        // throw Error("error : ");
    },
    saveUserData : async(obj)=>{
        let result;
        for(let i=0;i<data.length;i++){
            if(await getData(obj,data[i])){
                data[i].userName=obj.userName;
                data[i].game=obj.game;
                data[i].discription=obj.discription;
                result=data[i];
            }
        }
        return result;
    },
    createEvent : async (obj)=>{
        obj.id=data.length+1;
        await data.push(obj);
        return true;
    },
    getUserData : async(obj)=>{
        let result=[];
        for(let i=0;i<data.length;i++){
            if(await getUserData(obj,data[i])){
                result.push(data[i]);
            }
        }
        return result;
    },
    getAllData : ()=>{
        return data;
    },
    registerUser : (obj)=>{
        let userObj={
            userId : user.length+1,
            email : obj.email,
            password : obj.password,
            userName : obj.userName
        }
        user.push(userObj);
        return true;
    }
}

const getUser=(obj,userIs)=>{
    let result=false;
    if(obj.email === userIs.email && userIs.password === obj.password){
        result=true;
    }
    return result;
}

const getData=(obj,dataIs)=>{
    let result=false;
    if(obj.id === dataIs.id){
        result=true;
    }
    return result;
}

const getUserData=(obj,dataIs)=>{
    let result=false;
    if(obj.userId === dataIs.userId){
        result=true;
    }
    return result;
}