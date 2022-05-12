const _get = require('lodash/get');

const defaultOptions = {
    family: 4,
    keepAlive: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoIndex: true
};

function databaseConfig(environmentVariables) {
    const database = _get(environmentVariables, 'DATABASE_URI');
    return { database, defaultOptions };
}

module.exports = databaseConfig;
