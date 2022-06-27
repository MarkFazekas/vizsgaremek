const fsp = require('fs').promises;
const Vehicle = require('../models/vehicle.model');
const Partner = require('../models/partner.model');
const TripReason = require('../models/trip_reason.model');
const User = require('../models/user.model');
const Destination = require('../models/destination.model');

const seedCollection = async (model, fileName) => {
    const exists = await model.find().count();
    if (!exists) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`,
            'utf8'
        );
        const list = await JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, {limit: 100});
        }
    }
};

module.exports = async () => {
//     await Promise.all([
//         seedCollection(User, 'users'),
//         seedCollection(Vehicle, 'vehicles'),
//         seedCollection(Partner, 'partners'),
//         seedCollection(TripReason, 'trip_reasons'),
//         seedCollection(Destination, 'destinations'),
//     ])
    await seedCollection(User, 'users');
    await seedCollection(Vehicle, 'vehicles');
    await seedCollection(Partner, 'partners');
    await seedCollection(TripReason, 'trip_reasons');
    await seedCollection(Destination, 'destinations');
}
