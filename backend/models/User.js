const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true,
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
    profileImageUrl: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member", // Role base access
    },
    // tasks: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Task",
    //     },
    // ],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);