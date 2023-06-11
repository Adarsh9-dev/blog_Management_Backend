import express from "express";
import {createAuthor, loginAuthor} from "../controller/authController.js";
import {createBlog, showAllBlog, updateBlog, deleteBlogById, deleteBlogByQuery} from "../controller/blogController.js";
import {authentication, autherisation} from "../middleware/auth.js";
import {authorMid, loginMid, createBlogMid, deleteBlogQuery} from "../middleware/mid.js"

const router = express.Router();

//----------------------------------------------------------------------------
router.post('/authors',authorMid,createAuthor); //create author
router.post('/login', loginMid, loginAuthor); //login author
//----------------------------------------------------------------------------
router.post('/blogs', authentication, createBlogMid, createBlog); // add blog 
router.get('/blogs',authentication, showAllBlog); //show all blog 
router.put('/blogs/:blogId',authentication, autherisation, updateBlog); //update blog 
router.delete('/blogs/:blogId',authentication, autherisation, deleteBlogById);//delete blog 
router.delete('/blogs',authentication, deleteBlogQuery, deleteBlogByQuery); //delete blog by query 
//----------------------------------------------------------------------------

export default router;