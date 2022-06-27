const mongoose = require('mongoose');
const Schema = require("./schemas/partner.schema")

module.exports = mongoose.model('Partner', Schema);
