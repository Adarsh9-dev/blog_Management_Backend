import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Blog from "../model/blogModel.js";

dotenv.config();

const authentication = async (req,res,next) => {
    try {
        const token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).json({status: false, message: "Token not find"})
        }

        const isValid = jwt.verify(token, process.env.SECRET_KEY);
        if (!isValid) {
            return res.status(400).json({status: false, message: "Invalid Token"})
        }

        req.decodedData = isValid;
        next();

    } catch(err) {
        res.status(500).json({status: false, message: err.message});
    }
}

const autherisation = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const blogData = await Blog.findById({_id: blogId});

        if (JSON.stringify(req.decodedData.data._id) !== JSON.stringify(blogData.authorId)) {
            return res.status(400).json({status: false, message: "Invalid Access"})
        }

        req.userInformation = blogData;
        next();
        
    } catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
}
export {authentication, autherisation};