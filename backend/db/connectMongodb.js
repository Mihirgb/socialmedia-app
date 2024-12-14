import mongoose from "mongoose";
const connectMongodb=async ()=>{
 try{
    const connect=await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongodb connected at ${connect.connection.host}`)
 }  
 catch(err){
    console.log(err);
 } 
}
export default connectMongodb