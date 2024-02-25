const express = require('express');
const { AddLocation, Search, LikeLocation, RemoveLikeLocation, ConvertDislikeToLikeLocation, ConvertLikeToDislikeLocation, RemoveDislikeLocation, DislikeLocation } = require("../controllers/LocationManagement");

const router = express.Router();

//Add Location
router.post('/addlocation', AddLocation);

//Search 
router.post('/search', Search);

//Like Location
router.post("/like-location", LikeLocation);

// RemoveLikeLocation 
router.post("/remove-like-location", RemoveLikeLocation);

//ConvertDislikeToLikeLocation
router.post("/convert-dislike-to-like-location", ConvertDislikeToLikeLocation);

//ConvertLikeToDislikeLocation
router.post("/convert-like-to-dislike-location", ConvertLikeToDislikeLocation);

//RemoveDislikeLocation
router.post("/remove-dislike-location", RemoveDislikeLocation);

//DislikeLocation
router.post("/dislike-location", DislikeLocation);

module.exports = router;