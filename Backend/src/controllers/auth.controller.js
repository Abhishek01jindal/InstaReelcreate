const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
   const {username, email, password, bio, profileImage} = req.body;

const isUserAlreadyExists = await userModel.findOne({
    $or:[
        {email},
         {username}
        ]
    });
    if(isUserAlreadyExists){
        return res.status(409).json({message:"User already exists"+(isUserAlreadyExists.email === email ? " with this email" : " with this username") })
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    });

    const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"1d"});
    res.cookie("token", token)
    res.status(201).json(
        {message:"User registered successfully", 
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    });

}
 
 async function loginController(req, res) {
    const {username, email, password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {
              username: username
             },
             {
                email: email
             }
            ]        
    }).select("+password");

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid password"});
    }
     
   const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"1d"});
   res.cookie("token", token)
   res.status(200).json(
    {message:"User logged in successfully", 
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
});

}

async function getMeController(req, res){
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    res.status(200).json({
        message:"User retrieved successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {registerController, loginController, getMeController};