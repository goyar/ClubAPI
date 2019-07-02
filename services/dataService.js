// ODM import
const mongoose = require('mongoose');

// Connection information
const connectionString = require('../config/config').mongodb.connectionString;

// Models import
const dataBase = {
    players: require('../models/players').model,
    guardians: require('../models/guardians').model,
    coaches: require('../models/coaches').model,
    teams: require('../models/teams').model,
    categories: require('../models/categories').model
};

module.exports = {
    connect: function(){
        return new Promise(function(resolve, reject){
            mongoose.connect(connectionString, {useNewUrlParser: true});

            mongoose.connection.on('error', (err)=>{
                reject(err);
            });

            mongoose.connection.once('open',()=>{
                resolve(`Connection to data service successful`);
            });
        });
    },
    queries:{
        defaultQuery: function(){
            return new Promise(
                function(resolve, reject){

                }
            );
        },
        getAllDocuments: function(collection){
            return new Promise(
                function(resolve, reject){
                    dataBase[collection].find({}).exec()
                    .then(
                        (data)=>{
                            resolve(data);
                        }
                    )
                    .catch(
                        (err)=>{
                            reject(err);
                        }
                    );
                }
            );
        }
    }
}