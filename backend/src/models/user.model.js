const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    "first_name": {
        "type": "String",
        "required": false
    },
    "last_name": {
        "type": "String",
        "required": false
    },
    "email": {
        "type": "String",
        "required": true
    },
    "password": {
        "type": "String",
        "required": false
    },
    "role":  {
        "type": "Number",
        "default": 0
    },
}, {
    timeStamps: true
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);
