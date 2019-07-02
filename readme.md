# Club API
Simple API for NodeJS

## Node Modules
* Express
* Mongoose

## Test database
An example script to initialize a MongoDB database that matches this API can be found in my repository: [teamsDatabaseCreationScript](https://github.com/goyar/teamsDatabaseCreationScript)

## Endpoints
Endpoint	| Description
-----------------|---------------------------------------------------
`club/players`|Returns all the entrues in the `Players` collection.
`club/guardians`|Returns all the entrues in the `Guardians` collection.
`club/coaches`|Returns all the entrues in the `Coaches` collection.
`club/teams`|Returns all the entrues in the `Teams` collection.
`club/categories`|Returns all the entrues in the `Categories` collection. for NodeJS

## Config.js
All the necessary environmental configurations can be added and exported in the `/config/config.js` file: 

```javascript
module.exports = {
    mongodb:{
        connectionString: `mongodb://${secrets.mongodb}localhost:27017/teams-api-test`
    }
}
```

## Secrets
For this application to work, the user has to create a new file that exports user and password configurations as follows:

 `/config/secrets.js` :

```javascript
module.exports = {
    mongodb: 'user:password@' 
}
```

