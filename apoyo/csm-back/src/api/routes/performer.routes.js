const { Router } = require('express')
const auth = require('../middleware/auth.middleware');

module.exports = ({ PerformerController }) => {
    const router = Router()
    
    router.post('/', auth, PerformerController.create)
    router.get('/', PerformerController.getPerformers)

    return router
}
