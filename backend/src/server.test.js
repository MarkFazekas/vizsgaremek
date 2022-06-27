require('dotenv').config();
const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const {response} = require('jest-mock-req-res');
const {Test} = require('supertest');

mongoose.Promise = global.Promise;
const User = require('./models/user.model');

describe('REST API integration tests', () => {

    let token;

    beforeEach(done => {

        mongoose.Promise = global.Promise;
        const {host} = config.get('database');

        mongoose.connect(host, {
            useNewUrlparser: true,
            useUnifiedTopology: true,
        }).then(async () => {
            try {
                return supertest(app)
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .send({
                        "email": "kgasparro0@prnewswire.com",
                        "password": "Atl++0CXeYwScsBg3HNWrEBdGLqWUuLtgVYrZ4En0wiF4c07Mib4S2WOfggYccVL"
                    })
                    .expect(200)
                    .then((response) => {
                        token = response.body.accessToken;
                        console.log(`Token: ${token}`)
                        done()
                    }).catch(err => console.log(err))
            } catch (error) {
                console.log(error);
                process.exit();
            }
        }).catch((err) => {
            console.error(`Error connecting to mongo database: ${host}/${database}. Error is: ${err.message}`);
            process.exit();
        });
    });

    afterEach(done => {
        // dbAdmin@test jog kell az adatbázis eldobásához, de nem dobjuk el, mert kellenek a teszt adataink
        // Valamiért, 0-ból a második futtatásra találja meg a felhasználót.
        // mongoose.connection.db.dropDatabase((error) => {
        //     mongoose.connection.close(() => done())
        // })
        done();
    });

    test('GET /product', done => {
        // supertest(app).get('/product').expect(200)
        //     .then(response => {
        //         expect(Array.isArray(response.body)).toBeTruthy();
        //         done();
        //     });

        done();
        // done();
    });
});
