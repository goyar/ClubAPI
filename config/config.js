const secrets = require('./secrets');

module.exports = {
    mongodb:{
        connectionString: `mongodb://${secrets.mongodb}localhost:27017/teams-api-test`
    }
}