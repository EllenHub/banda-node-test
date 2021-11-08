const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { authRouter, userRouter } = require('./routes');
const { PORT, MONGO_CONNECT_URL } = require('./configs/configs');

const app = express();
mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongoose connected successfully');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log('Server started');
});
