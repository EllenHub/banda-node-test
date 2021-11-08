const ErrorHandler = require('../errors/ErrorHandler');
const { statusCode, statusMessage} = require('../constants');
const { User } = require('../database');
const userValidator= require('../validators/user.validator');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try{
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(statusMessage.existEmail, statusCode.alreadyExists);
            }

            req.user = userByEmail;
            next();
        } catch(e) {
            next(e);
        }
    },
    userBodyValidation:(req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.isNotValid);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
