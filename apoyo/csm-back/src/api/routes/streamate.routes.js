const { Router } = require('express');

module.exports = ({ StreamateController }) => {
    const router = Router();
    
    router.post('/', StreamateController.create);
    router.get('/', StreamateController.getPaginatedRequest);
    router.get('/duplicated', StreamateController.getDuplicated);

    return router;
};
