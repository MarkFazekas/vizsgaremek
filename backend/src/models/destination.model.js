const mongoose = require('mongoose');
const Schema = require("./schemas/destination.schema")

module.exports = mongoose.model('Destination', Schema);
