import authModel from "../model/authModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const createAuthor = async (req,res) => {
    try {
        const author = {
            fname:req.body.fname,
            lname:req.body.lname,
            title:req.body.title,
            email: req.body.email,
            password: req.body.password,
        }
        const saltRounds = 10;

        author.password = await bcrypt.hash(author.password, saltRounds);

        const result = await authModel.create(author);
        res.status(201).json({status: true, data: result});
    } catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
}

const loginAuthor = async (req, res) => {
    try {
        const {email, password} = req.body;

        const isCheck = await authModel.findOne({email: email});
        if (!isCheck) {
            return res.status(400).json({status: false, message: "Invalid Details"})
        }

        const hashPassword = await bcrypt.compare(password, isCheck.password);
        if (!hashPassword) {
            return res.status(400).json({status: false, message: "Invalid Email & Password"})
        }

        const token = jwt.sign({data: isCheck}, process.env.SECRET_KEY);

        res.status(200).json({status: true, token: token})

    } catch(err) {
        res.status(500).json({status: false, message: "Login Failed"})
    }
}

export {createAuthor, loginAuthor}
