import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type:String, require: true, unique: true },
    avatarUrl: { type:String },
    socialOnly: { type:Number, default: false },
    username: { type:String, require: true, unique: true },
    password: { type:String },
    name: { type:String, require: true },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }]
})

userSchema.pre('save', async function(){
    if(this.isModified("password")){ // isModified : 값이 수정되면 true 리턴
        this.password = await bcrypt.hash(this.password, 5);
    }
    
}); // 해시 작업 

const User = mongoose.model("user", userSchema);
export default User; 