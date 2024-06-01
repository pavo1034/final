import mongoose from "mongoose";

const DBconnect =async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/client");
        console.log("DB connected")
    }
    catch(err){
        console.log(err)
    }
  
}

export default DBconnect;