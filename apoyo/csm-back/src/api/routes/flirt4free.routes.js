const { Router } = require('express');

module.exports = ({ Flirt4FreeController }) => {
    const router = Router();
    
    router.post('/', Flirt4FreeController.create);
    router.get('/', Flirt4FreeController.getPaginatedRequest);
    router.get('/duplicated', Flirt4FreeController.getDuplicated);

    return router;
};
