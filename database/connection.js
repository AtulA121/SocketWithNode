let mongoose=require("mongoose");
module.exports={
    connect : async(url)=>{
        await mongoose.connect(url,(err,db)=>{
            console.log(err+" "+db);
        });
    }
};