import express, { urlencoded } from "express"
import authroutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import dotenv from "dotenv"
import connectMongodb from "./db/connectMongodb.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app=express()

app.use(express.json()) //this parses the incoming json requests in req.body
//when you send data in the request body it is usually in a json string, javascript cannot understand a raw
//json string, therefore we need a body parser.
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())//middleware for parsing cookies

app.use("/api/routes", authroutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/notifications",notificationRoutes)

app.listen(8080,()=>{
    console.log('Server started at port 8080')
    connectMongodb()
})