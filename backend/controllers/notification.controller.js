import User from "../models/user.model.js"
import Notification from "../models/notification.model.js"

export const getAllNotifications=async (req,res)=>{
    try {
        const userid=req.user._id
        const user=await User.findById(userid)
        const notifications=await Notification.find({to:user})
        res.status(200).json(notifications)

    } 
    catch (error) {
        console.log("Error in getallnotifications",error)
        res.status(500).json("Internal server errror")
    }
}

export const deleteAllNotifications=async(req,res)=>{
    try {
        const userid=req.user._id
        const user=await User.findById(userid)
        const notifications=await Notification.deleteMany({to:user})
        res.status(200).json(notifications)

    } 
    catch (error) {
        console.log("Error in deleteallnotifications",error)
        res.status(500).json("Internal server errror")
    }
}

export const deleteNotification=async(req,res)=>{
    try {
        const id=req.params.id
        const userid=req.user._id
        const notification=await Notification.findById(id)
        if(!notification){
            return res.status(404).json({error:"Notification not found"})
        }
        if(notification.to.toString()!==userid.toString()){
            return res.status(403).json({error:"You are not allowed to delete this notificationn"})
        }
        await Notification.findByIdAndDelete(id)
        res.status(200).json({message:"Notification deleted successfully"})
        
    } catch (error) {
        console.log("Error in deletenotifications",error)
        res.status(500).json("Internal server errror")
    }
}