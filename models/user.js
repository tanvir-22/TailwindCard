import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },  
    password: {
        type: String,
        required: true,
    },  
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    }

})
export default mongoose.model("User", user);

