import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenandSetCookie from "../lib/utils/generateToken.js";

export const signup=async (req,res)=>{

    try{
const {name,email,password}=req.body;
    const existinguser= await User.findOne({email})
    if(existinguser){
        return res.status(400).json({error:"User already exists"})
    }
    const salt =await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt);

    const newuser=new User({
        name,
        email,
        password:hashedpassword
    })

    if(newuser){
        generateTokenandSetCookie(newuser._id,res)
        await newuser.save()
        res.status(201).json({_id:newuser._id,message:"User created successfully"})
    }
    else{
        res.status(400).json({error:"Invalid user data"})
    }

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server errror"})
    }
    
}

export const login= async(req,res)=>{
    try{

        const {email, password}=req.body
        const existingemail=await User.findOne({email:email})
        if(existingemail && bcrypt.compare(password, existingemail.password)){
            generateTokenandSetCookie(existingemail._id,res)
            return res.status(201).json("Login successful")
        }
        else if(!existingemail){
            return res.status(401).json("Invalid email or password");

        }
        else if(password!==existingemail.password){
            return res.status(401).json({id:existingemail._id,msg:  "Invalid email or password"});

        }
    }
    catch(err){
        res.status(500).json({error:"Internal server error"})
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","")
        res.status(200).json("Logged out successfully")

    }
    catch{
        console.error("error in logout controller")
        res.status(500).json({error:"Internal server error"})
    }
}

export const getme=async (req,res)=>{
    try{
        const user=await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    }
    catch{
        console.error("error in getme controller")
        res.status(500).json({error:"internal server error"})
    }
}