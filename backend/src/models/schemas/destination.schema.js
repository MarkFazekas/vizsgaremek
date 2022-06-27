const mongoose = require('mongoose');
const PartnerSchema = require("./partner.schema");
const TripReasonSchema = require("./trip_reason.schema");
const VehicleSchema = require("./vehicle.schema");

const DestinationSchema = mongoose.Schema({
    "date": {
        "type": "Date",
        "required": true
    },
    "vehicle": VehicleSchema,
    "from_partner": PartnerSchema,
    "to_partner": PartnerSchema,
    "trip_type": TripReasonSchema,
    "distance": {
        "type": "Number",
        "required": true
    },
}, {
    timeStamps: true
});

module.exports = DestinationSchema;
