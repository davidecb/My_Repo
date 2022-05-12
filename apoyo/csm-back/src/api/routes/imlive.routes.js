const { Router } = require('express');

module.exports = ({ ImLiveController }) => {
    const router = Router();
    
    router.post('/', ImLiveController.create);
    router.get('/', ImLiveController.getPaginatedRequest);
    router.get('/duplicated', ImLiveController.getDuplicated);

    return router;
};
