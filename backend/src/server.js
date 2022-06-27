const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Authentication.
const authenticateJwt = require('./controllers/auth/authenticate');
const login = require('./controllers/auth/login');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const {host} = config.get('database');
mongoose.connect(host, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        require('./seed/seeder');
        logger.info('MongoDB connection has been established successfully.');
    })
    .catch(err => {
        logger.error(err);
        process.exit();
    });

app.use(cors());

app.use(morgan('combined', {stream: logger.stream}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Router.
app.post('/login', login.login);

app.use('/vehicles', authenticateJwt, require('./controllers/vehicle/routes'));
app.use('/partners', authenticateJwt, require('./controllers/partner/routes'));
app.use('/trip-reasons', authenticateJwt, require('./controllers/trip-reason/routes'));
app.use('/destinations', authenticateJwt, require('./controllers/destination/routes'));
app.use('/users', authenticateJwt, require('./controllers/user/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
