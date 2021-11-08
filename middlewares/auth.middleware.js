const {AUTHORIZATION} = require('../constants/regex');
const {Auth, User} = require('../database');
const {authValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {passwordService, jwtService} = require('../services');
const {tokenTypeEnum, statusMessage, statusCode} = require('../constants');
const {userNormalizer} = require('../util/user-util');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await jwtService.verifyToken(token, tokenTypeEnum.ACCESS);

            if (!token) {
                throw new ErrorHandler(statusCode.invalidToken, statusMessage.invalidToken);
            }

            const tokenResponse = await Auth.findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(statusCode.invalidToken, statusMessage.invalidToken);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
    isDataValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCode.isNotValid);
            }

            await passwordService.compare(password, userByEmail.password);

            const normalizedUser = userNormalizer(userByEmail);

            req.user = normalizedUser;
            next();
        } catch (e) {
            next(e);
        }
    },
    validateLoginData: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

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

