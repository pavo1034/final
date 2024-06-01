import mongoose,{Schema} from "mongoose";

const   UserSchema = new Schema({
    name:String,
    email:String,
    price:Number,
    phoneNo:Number,
})


const User = mongoose.models.User || mongoose.model("User",UserSchema);

export default User;