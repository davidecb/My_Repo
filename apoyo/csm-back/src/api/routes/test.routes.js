const { Router } = require('express');

module.exports = ({ TestController }) => {
    const router = Router();

    router.get('/', TestController.get);
    router.post('/', TestController.create);
    router.get('/query-params/:id', TestController.getQueryParams);
    router.get('/query-string', TestController.getQueryString);

    return router;
};
