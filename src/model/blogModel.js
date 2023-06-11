import mongoose from "mongoose";
import authModel from "./authModel.js"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:authModel
    },
    tags: [
        {
            type: String
        }
    ],
    category: {
        type: String,
        required: true
    },
    subcategory: [
        {
            type: String
        }
    ],
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }    
},{ timestamps: true})

export default mongoose.model("BlogHead",blogSchema);