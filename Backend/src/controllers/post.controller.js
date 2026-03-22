const postModel = require('../models/post.model');
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const likeModel = require('../models/like.model');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

 const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: "Test",
    folder: "insta-clone"
 })

 const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
 })
    res.status(201).json({message: "Post created successfully", post})

}

async function getpostControllers(req, res) {
     
  const userId = req.user.id
  const posts = await postModel.find({user: userId})
    res.status(200).json({message: "Posts fetched successfully", posts})

}   

async function getPostDetailsController(req, res) {

const userId = req.user.id
const postId = req.params.postId
const post = await postModel.findById(postId) 
if(!post){
    return res.status(404).json({message: "Post not found"})
}
const isValiduser = post.user.toString() === userId
if(!isValiduser){
    return res.status(403).json({message: "Forbidden content"})
}
 return res.status(200).json({message: "Post details fetched successfully", post})

}

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({message: "Post not found"})
    }
    const like = await likeModel.create({
        post: postId,
        user: username
    })
    res.status(200).json({message: "Post liked successfully", like})

}

async function unlikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.username
    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if(!isLiked){
        return res.status(400).json({
            message: "Post not liked yet"
        })
    }
   await likeModel.findByIdAndDelete({_id: isLiked._id})
    res.status(200).json({message: "Post unliked successfully"})
}

async function getFeedController(req, res) {
    const user = req.user
   const posts = await Promise.all((await postModel.find().sort({_id: -1}).populate("user").lean())
   .map(async (post)=>{
    const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id
    })
    post.isLiked = !!isLiked
    return post
   }))
    res.status(200).json({
        message: "Feed fetched successfully",
         posts
        })

}

module.exports = { createPostController , getpostControllers, getPostDetailsController, likePostController , unlikePostController, getFeedController} 