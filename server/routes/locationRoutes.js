const express = require('express');
const { AddLocation, Search } = require("../controllers/LocationManagement");

const router = express.Router();

//Add Location
router.post('/addlocation', AddLocation);

//Search 
router.post('/search', Search);

module.exports = router;