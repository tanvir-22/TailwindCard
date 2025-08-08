import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,     
    },
    category:{
        type: String,
        required: true,
    },
    language:{
        type: String,   
        required: true,
    },
    image_url:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    availavility_status: {
        type: String,
    }
})
export default mongoose.model("Book",bookSchema);