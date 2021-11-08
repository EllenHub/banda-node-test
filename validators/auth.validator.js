const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../constants/regex');

const loginValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    loginValidator
};
