const fsp = require('fs').promises;
const Vehicle = require('../models/vehicle.model');
const Partner = require('../models/partner.model');
const TripReason = require('../models/trip_reason.model');
const User = require('../models/user.model');
const Destination = require('../models/destination.model');

const seedCollection = async (model, fileName) => {
    try {
        const exists = await model.find().count();
        if (!exists) {
            throw new Error();
        }
    } catch (e) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`, 
            'utf8'
        );
        const list = JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, {limit: 100});
        }
    }
};

( async () => {
    seedCollection(User, 'users');
    seedCollection(Vehicle, 'vehicles');
    seedCollection(Partner, 'partners');
    seedCollection(TripReason, 'trip_reasons');
    seedCollection(Destination, 'destinations');
})();
