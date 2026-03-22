const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post Id is required"]
    },
    user:{
        type: String,
        ref: "users",
        required: [true, "Username is required"]
    }
    },{
    timestamps: true
    })

likeSchema.index({post: 1, user: 1}, {unique: true});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
