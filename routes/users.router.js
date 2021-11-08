const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {userController } = require('../controllers');
const {userMiddleware } = require('../middlewares');

router.get('/info',
    authMiddleware.checkAccessToken,
    userController.getUsersInfo);

router.get('/latency',
    authMiddleware.checkAccessToken,
    userController.latency);

router.post('/signup',
    userMiddleware.userBodyValidation,
    userMiddleware.isEmailUnique,
    userController.createUser);

module.exports = router;

