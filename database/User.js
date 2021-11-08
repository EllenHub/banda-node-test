const {Schema, model} = require('mongoose');

const {userModelEnum} = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    id_type: {
        type: String
    }
}, {timestamps: true});

module.exports = model(userModelEnum.USER, userSchema);
