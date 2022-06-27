require('dotenv').config();
const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const { response } = require('jest-mock-req-res');
const { Test } = require('supertest');

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
                const user = new User({
                    first_name: 'Lopós',
                    last_name: 'Jani',
                    email: 'info@oxoniumx.eu',
                    password: 'P4$$WORD',
                    role: 1
                });

                await user.save().then(() => {
                    return supertest(app)
                        .post('/login')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({ "email": "info@oxoniumx.eu", "password": "$2a$10$n2GfG83.csS9l0/1zuQylOiY3z6l331fOMFaDMb8EwfB0Ux3C7qLO" })
                        .expect(200)
                        .then((response) => {
                            token = response.body.accessToken;
                            console.log(`Token: ${token}`)
                            done()
                        }).catch(err => console.log(err))
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
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done())
        })
    });

    test('GET /product', done => {
        supertest(app).get('/product').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
});
