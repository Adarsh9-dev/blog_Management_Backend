import express from "express";
import dontenv from "dotenv";
import centralRouter from "./router/router.js";
import cors from "cors";
import "./db/conn.js";

dontenv.config();
const app = express();
const port = process.env.PORT || 3300;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/',centralRouter);

app.listen(port,()=> {
    console.log(`Server is running at ${port}`)
})