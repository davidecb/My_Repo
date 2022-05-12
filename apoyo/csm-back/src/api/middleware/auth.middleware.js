const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'DCortesB-CSMModelsSociety')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        req.role = user.role
        next()
    } catch (err) {
        res.status(401).send({ error: 'Debes iniciar sesión' })
    }

}

module.exports = auth