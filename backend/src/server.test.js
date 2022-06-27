require('dotenv').config();
const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const {response} = require('jest-mock-req-res');
const {Test} = require('supertest');

mongoose.Promise = global.Promise;
const User = require('./models/user.model');
const Vehicle = require('./models/vehicle.model');
const Partner = require('./models/partner.model');
const TripReason = require('./models/trip_reason.model');
const Destination = require('./models/destination.model');
const UserList = require('./seed/users.json');
const VehicleList = require('./seed/vehicles.json');
const PartnerList = require('./seed/partners.json');
const TripReasonList = require('./seed/trip_reasons.json');
const DestinationList = require('./seed/destinations.json');

describe('REST API integration tests', () => {

    let token;

    beforeEach(async () => {
        mongoose.Promise = global.Promise;
        const {host} = config.get('database');

        try {
            await mongoose.connect(host, {
                useNewUrlparser: true,
                useUnifiedTopology: true,
            })
        } catch (err) {
            console.error(`Error connecting to mongo database: ${host}/. Error is: ${err.message}`);
            process.exit(1);
        }

        try {
            // Feltöltjük a mint adataink az adatbázisba
            await require('./seed/seeder')();
            // Belépünk
            const response = await supertest(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    "email": "kgasparro0@prnewswire.com",
                    "password": "Atl++0CXeYwScsBg3HNWrEBdGLqWUuLtgVYrZ4En0wiF4c07Mib4S2WOfggYccVL"
                }).expect(200)
            // A Token-t lementjük.
            token = response.body.accessToken;
            console.log(`Token: ${token}`)
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    });

    afterEach(async () => {
        // dbAdmin@test jog kell az adatbázis eldobásához
        // Dropoljuk a test adatbázist
        await mongoose.connection.db.dropDatabase();
        // Majd lezárjuk a kapcsolatot
        await mongoose.connection.close()
    });

    const checkObjectEquality = (expected, current) => {
        // A teszt adat kulcsain végig megyünk
        for (const key in expected) {
            // Hogyha objektum akkor Objektumként ellenőrizzük
            if (typeof current === 'object') {
                checkObjectEquality(expected[key], current[key]);
            } else {
                // Ellenőrizzük, hogy a megfelelő sorszámű entitás a megfelelő sorszámú teszt adat értékeit tartalmazza.
                expect(current[key]).toBe(expected[key]);
            }
        }
    }

    const testList = async (endpoint, testData) => {
        // Lekérjük a megadott végpontot
        const response = await supertest(app).get(`/${endpoint}`).set('Authorization', 'Bearer ' + token).expect(200)
        // Ellenőrizzük, hogy a végpont Array-t ad-e vissza
        expect(Array.isArray(response.body)).toBeTruthy()
        // Ellenőrizzük, hogy a visszaadott Array hossza megegyezik-e a Test Adataink hosszával.
        expect(response.body.length).toBe(testData.length)

        // Végig megyünk a visszaadott entitás listán
        response.body.forEach((instance, index) => {
            checkObjectEquality(testData[index], instance);
        });
        return response;
    }

    const testGet = async (endpoint, testData) => {
        // Lekérjük a megadott végpontot
        const response = await supertest(app).get(`/${endpoint}`).set('Authorization', 'Bearer ' + token).expect(200)

        // Ellenőrizzük, hogy a visszaadott entitás megegyeik-e teszt adatunkkal
        checkObjectEquality(testData[0], response.body)
        return response;
    }

    test('GET /users', async () => {
        await testList("users", UserList)
    });
    test('GET /vehicles', async () => {
        await testList("vehicles", VehicleList)
    });
    test('GET /destinations', async () => {
        await testList("destinations", DestinationList)
    });
    test('GET /trip-reasons', async () => {
        await testList("trip-reasons", TripReasonList)
    });
    test('GET /partners', async () => {
        await testList("partners", PartnerList)
    });

    test('GET /users/:id', async () => {
        const firsElementOfCollection = await User.findOne({})
        await testGet(`users/${firsElementOfCollection._id}`, UserList[0])
    });
    test('GET /vehicles/:id', async () => {
        const firsElementOfCollection = await Vehicle.findOne({})
        await testGet(`vehicles/${firsElementOfCollection._id}`, VehicleList[0])
    });
    test('GET /destinations/:id', async () => {
        const firsElementOfCollection = await Destination.findOne({})
        await testGet(`destinations/${firsElementOfCollection._id}`, DestinationList[0])
    });
    test('GET /trip-reasons/:id', async () => {
        const firsElementOfCollection = await TripReason.findOne({})
        await testGet(`trip-reasons/${firsElementOfCollection._id}`, TripReasonList[0])
    });
    test('GET /partners/:id', async () => {
        const firsElementOfCollection = await Partner.findOne({})
        await testGet(`partners/${firsElementOfCollection._id}`, PartnerList[0])
    });
});
