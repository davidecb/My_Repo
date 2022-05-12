const { Router } = require('express');

module.exports = ({ LivejasminController }) => {
    const router = Router();
    
    router.post('/', LivejasminController.create);
    router.get('/', LivejasminController.getPaginatedRequest);
    router.get('/getfromapirange', LivejasminController.getFromApiRange);

    return router;
};
