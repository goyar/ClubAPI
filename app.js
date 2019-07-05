// Base directory of the application
process.DIRNAME = __dirname;

// Required node modules
const express = require('express');
const bodyParser = require('body-parser');
const coockieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

// Required internal modules
const secrets = require('./config/secrets');
const config = require('./config/config');
const passportSetup = require('./config/passportSetup');
const dataService = require('./services/dataService');
const authController = require('./controllers/authController');
const clubController = require('./controllers/clubController');

// Express instance & configuration
const app = express();

app.use(coockieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: secrets.cookieKey
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}));

// Express listening port
const HTTP_PORT = 3000;

// To log request on the console
app.use(morgan('dev'));

// Authentication routes
app.use('/auth', authController);

// Adding API routes
app.use('/club', clubController);

// Home route
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,`index.html`));
});

// Starting services
const startServer = async function(){
    try {
        await dataService.connect().then((msg)=>{
            console.log(msg);
        });
        await app.listen(HTTP_PORT, ()=>{
            console.log(`Http server listening at port: ${HTTP_PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}();
