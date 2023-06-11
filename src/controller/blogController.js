import Blog from "../model/blogModel.js";
import authModel from "../model/authModel.js";
import moment from "moment";
const now = moment();

const uniqueArray = (arr1,arr2) => {
    let uniqueObj = {};

    arr1.map(index=> {
        index = index.trim();
        if (index !== "") {
            uniqueObj[index] = 1;
        }
    });
    arr2.map(index=> {
        index = index.trim();
        if (index !== "") {
            uniqueObj[index] = 1;
        }
    });
    return Object.keys(uniqueObj);
}

const createBlog = async (req,res) => {
    try {
        req.body.tags = uniqueArray(req.body.tags,[]);
        req.body.subcategory = uniqueArray(req.body.subcategory,[]);

        const authorId = req.body.authorId;

        const isAuthor = await authModel.findById({_id: authorId});
        if (!isAuthor) {
            res.status(400).json({stauts: false, message: "Author not present"})
        }
        
        if (req.body.isPublished) {
            req.body.publishedAt = now.format('YYYY-MM-DD HH:mm:ss');
        }

        if (req.body.isDeleted) {
            req.body.deletedAt = now.format('YYYY-MM-DD HH:mm:ss');
        }

        const result = await Blog.create(req.body);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({status: false, message: err.message});
    }
}

const showAllBlog = async (req,res) => {
    try {
        //No query params it only return blogs which isDeleted is false
        if (Object.keys(req.query).length === 0) {
            const result = await Blog.find({isDeleted: false});
            return res.status(200).json({status: true, message: "Blogs list", data: result});
        }

        //If query params is present return blogs which isDeleted is false
        const keyData = Object.keys(req.query);
        let keyCount = 0;
        keyData.map((index)=> {
            if (index === "authorId" || index === "tags" || index === "category" || index === "subcategory") {
                keyCount++;
            }
        })
        
        if (keyData.length !== keyCount) {
            return res.status(400).json({status: false, message: "Invalid URL"})
        }

        const result = await Blog.find({$and: [{isDeleted: false},req.query]});
        if (!result) {
            return res.status(404).json({status: false, message: "Blog not found"});
        }
        
        res.status(200).json({status: true, message: "Blogs list", data: result})
        
    } catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
}

const updateBlog = async (req,res)=> {
    try {
        const blogId = req.params.blogId;
        const isBlog = req.userInformation

        if (isBlog.isDeleted) {
            return res.status(400).json({status: false, message: "Blog not exist"})
        }
        
        if('isPublished' in req.body ) {
            if (req.body.isPublished === true) {
                req.body.publishedAt = now.format('YYYY-MM-DD HH:mm:ss');
            }
        }

        if ('tags' in req.body) {
            req.body.tags = uniqueArray(isBlog.tags, req.body.tags);
        }

        if ('subcategory' in req.body) {
            req.body.subcategory = uniqueArray(isBlog.subcategory, req.body.subcategory);
        }

        const isBlogPresent = await Blog.findByIdAndUpdate({_id: blogId},req.body,{new: true});

        res.status(200).json({status: true, data: isBlogPresent});

    } catch(err) {
        res.status(404).json({status: false, message: "Something going wrong"})
    }
}

const deleteBlogById = async (req,res)=> {
    try {
        const blogId = req.params.blogId;
        const isBlogPresent = req.userInformation;

        if (isBlogPresent.isDeleted) {
            return res.status(404).json({status: false, message: "Blog not found"})
        }

        const obj = {
            isDeleted: true,
            deletedAt: now.format('YYYY-MM-DD HH:mm:ss')
        } 

        const isBlog = await Blog.findByIdAndUpdate({_id: blogId},obj,{new: true})
        res.status(200).json({status: true, message: "Blog is deleted Successfully"});

    } catch(err) {
        res.status(404).json({status: false, message: "Blog not found"});
    }
}

const deleteBlogByQuery = async (req,res)=> {
    try {
        const filterData = req.query;
 
        const isBlogPresent = await Blog.findOne(filterData);

        if (!isBlogPresent) {
            return res.status(404).json({status: false, message: "Not found"});
        }

        if (isBlogPresent.isPublished) {
            return res.status(400).json({status: false, message: "Blog is live. You Can't delete it"})
        }

        if (isBlogPresent.isDeleted) {
            return res.status(404).json({status: false, message: "Not found"});
        }

        const obj = {
            isDeleted: true,
            deletedAt: now.format('YYYY-MM-DD HH:mm:ss')
        } 

        const isBlog = await Blog.findByIdAndUpdate({_id: isBlogPresent._id}, obj, {new: true})

        res.status(200).json({status: true, message: "Blog is deleted Successfully"})


    } catch(err) {
        res.status(404).json({status: false, message: err.message})
    }
}

export {createBlog, showAllBlog, updateBlog, deleteBlogById, deleteBlogByQuery}
