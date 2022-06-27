const mongoose = require('mongoose');
const Schema = require("./schemas/trip_reason.schema")

module.exports = mongoose.model('TripReason', Schema);
