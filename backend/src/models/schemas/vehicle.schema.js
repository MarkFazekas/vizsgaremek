const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    "plate_number": {
        "type": "String",
        "required": true
    },
    "manufacturer": {
        "type": "String",
        "required": true
    },
    "model": {
        "type": "String",
        "required": true
    },
    "production_year": {
        "type": "Number",
        "required": true
    }
}, {
    timeStamps: true
});

module.exports = VehicleSchema;
