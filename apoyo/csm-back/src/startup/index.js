const express = require('express');
const cron = require('node-cron');
let _express = null;
let _config = null;
let _livejasminService = null;

class Server {
    constructor({ config, router, LivejasminService }) {
        _config = config;
        _livejasminService = LivejasminService;
        _express = express().use(router);
    }

    start() {
        return new Promise(resolve => {
            const message = `App listening on port ${_config.PORT}`;
            _express.listen(_config.PORT, () => console.info(message));

            resolve();
        });
    }

    cronTask() {
        const cronExpression = `0 0 * * *`;

        cron.schedule(cronExpression, async () => {
            const now = new Date();
            let connectionsActive;
            let connectionsInactive;

            do {                    
                connectionsActive = await _livejasminService.getFromApi(now, 1, 'day', 'active');
                let tiempo = new Date();
                tiempo.setSeconds(tiempo.getSeconds() + 120);
                while (new Date().getTime() < tiempo.getTime()) { }
            } while (connectionsActive === "error");
            await _livejasminService.create(connectionsActive);

            do {                    
                connectionsInactive = await _livejasminService.getFromApi(now, 1, 'day', 'inactive');
                let tiempo = new Date();
                tiempo.setSeconds(tiempo.getSeconds() + 120);
                while (new Date().getTime() < tiempo.getTime()) { }
            } while (connectionsInactive === "error");
            await _livejasminService.create(connectionsInactive);

            console.log('running livejasmin API at ', now);
        });
    }
}

module.exports = Server;
