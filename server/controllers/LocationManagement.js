const Location = require("../modules/Location");
const LocationCounter = require("../modules/LocationCounter");
const User = require('../modules/User');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dm5nmgxcs', 
    api_key: '457215961439474', 
    api_secret: 'g2ilBnb5cFMTzH0_uFUQcYP5vts' 
  });
  const upload = multer({ dest: 'uploads/' });

const upload_img_point = 2;

const AddLocation = async(req, res) => {

    const {curr_id} = await LocationCounter.find({"counter" : "id"});

    const location_id = curr_id

    const {user_id, coordinates, type, category, tag, description, place_name, img_url} = req.body;
    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(img_url, {
            resource_type: 'image',
          });
        const imageUrl = cloudinaryResponse.secure_url;
        const location = await Location.create({location_id, user_id, coordinates, type, category, tag, description, place_name, img_url:imageUrl});
        const rating = await User.findOneAndUpdate({user_id:user_id}, {"$inc" : {"rating" : upload_img_point}});
        const locationcounter = await LocationCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1}});
        return res.status(200).json("Location Added Successfully");
    }
    catch(error){
        console.log(error);
    }
}

const Search = async(req, res) => {
    const {category, place_name} = req.body;

    try{
        const location = await Location.find({category:category, place_name:place_name});
        if(location.length == 0){
            return res.status(200).json("No Results Found");
        }
        else{
            return res.status(200).json(location);
        }
    }
    catch(error){
        console.log(error);
    }
}

const LikeLocation = async(req, res) => {
    const {location_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Question.findOne({question_id : question_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Location.findOneAndUpdate({location_id : location_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
            console.log(addvote);
            const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = 1;
            console.log("else");
            const addvote = await Location.findOneAndUpdate({location_id : location_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");

}

const RemoveLikeLocation = async(req, res) => {
    const {location_id, liked_by_id} = req.body;
    try{
        const removevote = await Location.findOneAndUpdate({location_id : location_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : -1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const ConvertDislikeToLikeLocation = async(req, res) => {
    const {location_id, liked_by_id} = req.body;
    try{
        const addvote = await Location.findOneAndUpdate({location_id : location_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
        const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : 2}});
        console.log("Dislike to Like");

        res.status(200).json("Like Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const ConvertLikeToDislikeLocation = async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const addvote = await Location.findOneAndUpdate({location_id : location_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
        const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : -2}});
        console.log("Like to Dislike");
        res.status(200).json("Dislike Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const RemoveDislikeLocation = async(req, res) => {
    const {location_id, liked_by_id} = req.body;
    try{
        const removevote = await Location.findOneAndUpdate({location_id : location_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : 1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const DislikeLocation = async(req, res) => {
    const {location_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Location.findOne({location_id : location_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Location.findOneAndUpdate({location_id : location_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
            console.log(addvote);
            const addtotalvote = await Location.findOneAndUpdate({qlocation_id : location_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = -1;
            console.log("else");
            const addvote = await Location.findOneAndUpdate({location_id : location_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Location.findOneAndUpdate({location_id : location_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");

}

module.exports = {
    AddLocation, 
    Search, 
    LikeLocation,
    RemoveLikeLocation,
    ConvertDislikeToLikeLocation,
    ConvertLikeToDislikeLocation,
    RemoveDislikeLocation,
    DislikeLocation
}