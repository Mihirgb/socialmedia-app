import express from "express"
import {getUserProfile,followUnfollowUser, getSuggestedUsers, updateUser,getAllUsers} from '../controllers/user.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router=express.Router()
router.get("/profile/:name",protectRoute,getUserProfile)
router.post("/profile/:id",protectRoute,followUnfollowUser)
router.get("/getsuggested",protectRoute,getSuggestedUsers)
router.post("/updateuser",protectRoute,updateUser)
router.get("/getallusers",protectRoute,getAllUsers)
export default router