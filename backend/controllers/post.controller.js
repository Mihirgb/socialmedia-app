import User from "../models/user.model.js"
import Post from "../models/post.model.js"
import Notification from "../models/notification.model.js"
export const createPost=async(req,res)=>{
    try {
        const {text}=req.body
        if(!text){
            res.status(404).json("Cant create empty post")
        }
        const userid=req.user._id.toString()
        const user=await User.findById(userid)
        if(!user){
            res.status(404).json("Cant find the user")
        }

        const newPost=new Post({
            text,
            user
        })
        await newPost.save()
        res.status(200).json(newPost)

        
    } catch (error) {
        console.log('Error in createpost',error)
        res.status(500).json("Internal server error")
    }
}

export const deletePost=async(req,res)=>{
    try {
        const userid=req.user._id
        const user=await User.findById(userid)
        if(!user){
            res.status(404).json({error:"User not found"})
        }
        const postid=req.params.id
        const post=await Post.findById(postid)
        
        if(!post){
            res.status(404).json({error:"Post not found"})
        }
        if(post.user._id.toString() !==req.user._id.toString()){
            res.status(404).json({error:"You are not authorized to delete this post"})
        }
        await Post.findByIdAndDelete(postid)
        res.status(200).json({message:"Post Deleted Successfully"})
        
    } catch (error) {
        console.log('Error in deletepost',error)
        res.status(500).json("Internal server error")
    }
}

export const commentPost=async(req,res)=>{
    try {
        const postid=req.params.id
        const post =await Post.findById(postid)

        if(!post){
            res.status(404).json({error:"Post not found"})
        }

        const userid=req.user._id
        const user=await User.findById(userid)
        if(!user){
            res.status(404).json({error:"User not found"})
        }

        const {text}=req.body
        if(!text){
            res.status(404).json({error:"text not found"})
        }
        const comment={
            user:userid,text
        }
        post.comments.push(comment)
        await post.save()
        res.status(200).json({message:"Comment saved successfully",post})


    } catch (error) {
        console.log('Error in commentpost',error)
        res.status(500).json("Internal server error")   
    }
}

export const likeUnlikePost=async(req,res)=>{
    try {
        const postid=req.params.id
        const post =await Post.findById(postid)

        if(!post){
            return res.status(404).json({error:"Post not found"})
        }

        const userid=req.user._id
        const user=await User.findById(userid)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const likebox=post.likes
        if(likebox.includes(userid)){
            post.likes.pull(userid); // Pulls the user from the likes array
            user.likedPosts.pull(postid)
            await post.save(); // Save the post
            await user.save();
            return res.status(200).json({ message: "Unliked this post",post }); // Return to prevent further execution
        }
        else{
            post.likes.push(userid); // Pushes the user ID into the likes array
            user.likedPosts.push(postid)
            await user.save();
            await post.save(); // Save the post
            const notification = new Notification({
                from: req.user._id,
                to: post.user._id,
                type: 'like'
              })
              await notification.save()
            res.status(200).json({message:"Liked this post",post})

        }
       
        
    } catch (error) {
        console.log('Error in likeunlikepost',error)
        res.status(500).json("Internal server error")  
    }
}

export const getAllPosts=async(req,res)=>{
    try {
        const posts=await Post.find().sort({createdAt :-1}).populate({
            path:"user",
            select:"-password"}).populate({
                path:"comments.user",
                select:"-password"
            })
        res.status(200).json(posts)


    } catch (error) {
        console.log('Error in getallposts',error)
        res.status(500).json("Internal server error") 
    }
}

export const getLikedPosts=async(req,res)=>{
    try {
        const userid=req.params.id
        const user=await User.findById(userid)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const likedposts=await Post.find({_id:{$in:user.likedPosts}}).populate({
            path:"user",
            select:"-password"
        }).populate({
            path:"comments.user",
            select:"-password"
        })
        res.status(200).json(likedposts)
        
    } catch (error) {
        console.log('Error in getlikedposts',error)
        res.status(500).json("Internal server error")    
    }
}
export const getUserPosts=async(req,res)=>{
    try {
        const username=req.params.username
        const user=await User.findOne({name:username})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const userid=user._id
        const posts=await Post.find({user:userid})
        res.status(200).json(posts)
        
    } catch (error) {
        console.log('Error in getuserposts',error)
        res.status(500).json("Internal server error")    
    }
}