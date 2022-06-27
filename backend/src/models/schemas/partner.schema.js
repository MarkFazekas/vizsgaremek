const mongoose = require('mongoose');

const PartnerSchema = mongoose.Schema({
    "country_code": {
        "type": "String",
        "required": true
    },
    "state": {
        "type": "String",
        "required": false
    },
    "postcode": {
        "type": "String",
        "required": false
    },
    "city": {
        "type": "String",
        "required": true
    },
    "street": {
        "type": "String",
        "required": true
    },
    "house_number": {
        "type": "String",
        "required": true
    }
}, {
    timeStamps: true
});

module.exports = PartnerSchema;
