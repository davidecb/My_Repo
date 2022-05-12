const container = require('./startup/container');
const server = container.resolve('app');
const { DATABASE_URI } = container.resolve('config');
const initializeDatabaseConnection = require('./common/js/database/connection');

initializeDatabaseConnection({ DATABASE_URI })
    .then(() => {
        server.cronTask();
        return server.start();
    })
    .catch(console.error);
