module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/banda-node-test',
    PORT: process.env.PORT || 5000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'accessToken',
    JWT_REFRESH_SECRET: process.env. JWT_REFRESH_SECRET || 'refreshToken'
};
