const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema(
    {
        UserName: String,
        AuthProvider: {
            Provider: String,
            Id: String
        }
    }
);

module.exports = {
    model: mongoose.model("Users", users)
};