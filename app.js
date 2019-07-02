// Required node modules
const express = require('express');
const path = require('path');

// Required internal modules
const config = require('./config/config');
const dataService = require('./services/dataService');
const clubController = require('./controllers/clubController');

// Express instance & configuration
const app = express();
// app.use(bodyParser.urlencoded({extended: false}));

// Express listening port
const HTTP_PORT = 3000;

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
