const axios = require('axios');

const {passwordService} = require('../services');
const {statusCode} = require('../constants');
const {userNormalizer} = require('../util/user-util');
const {User} = require('../database');

module.exports = {
    getUsersInfo: async (req, res, next) => {
        try {
            const userInfo = await User.find().select('_id id_type');

            res.json(userInfo);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const newNormalizedUser = await userNormalizer(newUser);

            await User.findByIdAndUpdate({_id: newUser._id}, {id_type: newUser.email}, {new: true});

            res.status(statusCode.created).json(newNormalizedUser);
        } catch (e) {
            next(e);
        }
    },
    latency: async (req, res, next) => {
        try {
            const url = 'https://google.com';

            const {performance} = require('perf_hooks');

            const time = performance.now();

            let latencyTime = null;

            await axios.get(url).then(response => {
                console.log(response);
                latencyTime = `${(performance.now() - time) / 1000} seconds`;
                console.log(latencyTime);
            })
                .catch(err => console.log(err));

            res.json(latencyTime);

        } catch (e) {
            next(e);
        }
    }
};
