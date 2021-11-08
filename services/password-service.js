const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCode, statusMessage } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare:async (password, hashPassword) => {
        const isPasswordMatch = await bcrypt.compare(password,hashPassword);

        if(!isPasswordMatch){
            throw new ErrorHandler(statusMessage.isNotValid, statusCode.isNotValid );
        }
    }
};
