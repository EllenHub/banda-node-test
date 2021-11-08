const {Auth} = require('../database');
const {jwtService} = require('../services');

module.exports = {
    signin: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            await Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair,
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {token} = req;

            await Auth.deleteOne({token});

            res.json('User has logged out');
        } catch (e) {
            next(e);
        }
    }
};
