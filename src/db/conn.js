import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true})
    .then(()=> console.log("Db Connected"))
    .catch((err)=> console.log(err.message))