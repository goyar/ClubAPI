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

// User model for Authentication
const users = require('../models/users').model;

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
        getGoogleById: function(id){
            return new Promise(
                function(resolve, reject){
                    console.log("foundUser");
                    users.findById(id).exec()
                        .then((foundUser)=>{
                            console.log(foundUser);
                            resolve(foundUser);})
                        .catch(reject());
                }
            );
        },
        checkOrSaveGoogleUser: function(user){
            return new Promise(
                function(resolve, reject){
                    const query = { AuthProvider: user.AuthProvider }
                    users.findOne(query).exec()
                        .then(
                            (foundUser) =>{
                                if(foundUser){
                                    resolve(foundUser)
                                } else {
                                    user.save()
                                        .then(resolve(user))
                                        .catch(reject(err));
                                }
                            })
                        .catch(err => reject(err));
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