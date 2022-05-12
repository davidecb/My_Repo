const { Router } = require('express')
const auth = require('../middleware/auth.middleware')

module.exports = ({ UserController }) => {
    const router = Router()
    
    router.post('/', UserController.create)
    router.get('/notes', UserController.getMyNotes)
    router.post('/login', UserController.login)
    router.post('/logout', auth, UserController.logout)
    router.post('/logoutAll', auth, UserController.logoutAll)
    router.get('/getAuth', auth, UserController.getAuth)
    router.get('/getUsers', UserController.getUsers)

    return router
}
