import express from "express"
import {createPost, deletePost,commentPost,likeUnlikePost,getAllPosts,getLikedPosts,getUserPosts} from "../controllers/post.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router=express.Router()
router.post("/createPost",protectRoute,createPost)
router.delete("/:id",protectRoute,deletePost)
router.post("/comment/:id",protectRoute,commentPost)
router.post("/likeunlikepost/:id",protectRoute,likeUnlikePost)
router.get("/getallposts",protectRoute,getAllPosts)
router.get("/likes/:id",protectRoute,getLikedPosts)
router.get("/user/:username",protectRoute,getUserPosts)
export default router