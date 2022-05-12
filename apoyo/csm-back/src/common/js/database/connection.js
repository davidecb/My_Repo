const _get = require('lodash/get');
const mongoose = require('mongoose');
const databaseConfig = require('./config');

function successfulConnection() {
    console.info("connection successful");
}

function failedConnection(error) {
    console.error(`connection failed: ${error}`);    
}

function initializeDatabaseConnection(environmentVariables) {
    const dbConfig = databaseConfig(environmentVariables);
    const database = _get(dbConfig, 'database');    
    const defaultOptions = _get(dbConfig, 'defaultOptions');
    return mongoose.connect(database, defaultOptions)
        .then(successfulConnection)
        .catch(failedConnection);
}

module.exports = initializeDatabaseConnection;
