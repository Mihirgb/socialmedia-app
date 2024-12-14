import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import {deleteAllNotifications, deleteNotification, getAllNotifications} from "../controllers/notification.controller.js"

const router=express.Router()
router.get("/",protectRoute,getAllNotifications)
router.delete("/",protectRoute,deleteAllNotifications)
router.delete("/:id",protectRoute,deleteNotification)
export  default router