import mongoose from "mongoose";

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    profileimg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    likedPosts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

},{timestamps:true})

const User=mongoose.model("User",Userschema)
export default User;