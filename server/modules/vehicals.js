const mongoose = require("mongoose");

const vehicalSchema = new mongoose.Schema({
    vehical_number: {
        type: String,
        require: true,
    },
    vehical_type: {
        type: String,
        require: true,
    },
    fuel_type: {
        type: String,
        require: true,
    },
    owner_id: {
        type: String,
        require: true,
    }
});

const vehicalModel = mongoose.model('vehicals', vehicalSchema);

module.exports = vehicalModel;
