const { Router } = require('express');

module.exports = ({ CamsodaController }) => {
    const router = Router();
    
    router.post('/', CamsodaController.create);
    router.get('/', CamsodaController.getPaginatedRequest);
    router.get('/duplicated', CamsodaController.getDuplicated);

    return router;
};
