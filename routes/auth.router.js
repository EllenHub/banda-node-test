const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

router.post('/signin',
    authMiddleware.validateLoginData,
    authMiddleware.isDataValid,
    authController.signin);

router.get('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

module.exports = router;
