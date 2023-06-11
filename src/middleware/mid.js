import validator from "validator"

const authorMid = async (req,res,next) => {
    try {
        if (!req.body.fname) {
            return res.status(400).json({status: false, message: "Data is missing"})
        }
        if (!req.body.lname) {
            return res.status(400).json({status: false, message: "Data is missing"})
        }
        if (!req.body.title) {
            return res.status(400).json({status: false, message: "Data is missing"})
        }
        if (!req.body.email) {
            return res.status(400).json({status: false, message: "Data is missing"})
        }
        if (!req.body.password) {
            return res.status(400).json({status: false, message: "Data is missing"})
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        const nameRegex = /^[A-Za-z\- ']+$/;

        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({status: false, message: "Invalid Email & Password"})
        }

        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({status: false, message: "Invalid Email & Password"})
        }

        if (!nameRegex.test(req.body.fname)) {
            return res.status(400).json({status: false, message: "Invalid Name"})
        }

        if (!nameRegex.test(req.body.lname)) {
            return res.status(400).json({status: false, message: "Invalid Name"})
        }

        next();

    } catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
}

const loginMid = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        
        if (!email) {
            return res.status(400).json({status: false, message: "Something going wrong"})
        }
        if (!password) {
            return res.status(400).json({status: false, message: "Something going wrong"})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({status: false, message: "Invalid Email & Password"})
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({status: false, message: "Invalid Email & Password"})
        }

        next();

    } catch(err) {
        res.status(500).json({status: false, message: err.message});
    }
}

const createBlogMid = async(req,res,next) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.body.body) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.body.authorId) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.body.category) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }

        next()

    } catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
}

const deleteBlogQuery = async (req,res,next) => {
    try {
        if (!req.query.category) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.query.authorId) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.query.tags) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }
        if (!req.query.subcategory) {
            return res.status(400).json({status: false, message: "Some data are missing"});
        }

        next();

    } catch(err) {
        err.status(500).json({status: false, message: err.message})
    }
}

export {authorMid, loginMid, createBlogMid, deleteBlogQuery};