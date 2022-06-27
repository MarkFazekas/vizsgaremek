require('dotenv').config();
const config = require('config');
const app = require('./server');
const port = process.env.PORT || 3000;

if (!config.has('database')) {
    console.log('No database config found.');
    process.exit();
}

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
