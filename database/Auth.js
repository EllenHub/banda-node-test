const { Schema, model } = require('mongoose');

const { userModelEnum } = require('../constants');

const oAuthSchema = new Schema ({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModelEnum.USER
    }
}, {timestamps: true});

module.exports = model(userModelEnum.AUTH, oAuthSchema);
