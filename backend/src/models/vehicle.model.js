const mongoose = require('mongoose');
const Schema = require("./schemas/vehicle.schema")

module.exports = mongoose.model('Vehicle', Schema);
