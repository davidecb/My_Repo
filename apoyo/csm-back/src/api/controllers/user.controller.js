const _get = require('lodash/get')
let _userService = null

class UserController {
    constructor({ UserService }) {
        _userService = UserService
    }

    async create(req, res) {
        const username = req.body.username
        const name = req.body.name
        const searchQuery = {
            username
        }
        const userExist = await _userService.getDuplicated(searchQuery)
        if (userExist.length === 0) {
            const body = _get(req, 'body')
            const created = await _userService.create(body)
            res.status(201).json({ data: created })
        } else {
            res.status(400).json({ error: 'El usuario ya existe' })
        }        
    }
    
    async logout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
            await req.user.save()
            res.send()
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    
    async getMyNotes(req, res) {
        await req.user.populate('notes')
        res.status(200).json({ notes: req.user.notes })
    }
    
    async logoutAll(req, res) {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send()
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async login(req, res) {
        const username = _get(req, 'body.username')
        const password = _get(req, 'body.password')
        const searchQuery = {
            username,
            password
        }
        const retrieved = await _userService.login(searchQuery)
        res.status(200).json({ 
            user: retrieved.user,
            token: retrieved.token
        })
    } 
    
    async getUsers(req, res) {
        const retrieved = await _userService.getUsers();
        res.status(201).json({ data: retrieved })
    }
    
    async getAuth(req, res) {
        res.status(201).json()
    }
}

module.exports = UserController
