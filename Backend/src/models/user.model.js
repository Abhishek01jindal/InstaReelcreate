const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:[true, "Username is required"],
    unique:[true, "Username already exists"]
   },
   email:{
    type:String,
    required:[true, "Email is required"],
    unique:[true, "Email already exists"]
   },
   password:{
    type:String,
    required:[true, "Password is required"],
    select:false
   },
   bio:String,
   profileImage:{
    type:String,
    default:"https://ik.imagekit.io/swno2isq7/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.avif"
   },


});


const userModel = mongoose.model('users', userSchema);
module.exports = userModel;