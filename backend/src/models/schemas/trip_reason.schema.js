const mongoose = require('mongoose');

const TripReasonSchema = mongoose.Schema({
    "trip_reason": {
        "type": "String",
        "required": true
    },
    "trip_type": {
        "type": "String",
        "required": true
    },
}, {
    timeStamps: true
});

module.exports = TripReasonSchema;
