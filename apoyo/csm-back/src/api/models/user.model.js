const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new Schema({    
    name: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },    
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

UserSchema.virtual('performers', {
    ref: 'Performer',
    localField: '_id',
    foreignField: 'monitor'
})

UserSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'owner'
})


UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'DCortesB-CSMModelsSociety', { expiresIn: '1 day' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if(!user) {
        throw new Error('The user does not exist!!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('The password does not match!!')
    }

    return user
}

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', UserSchema);

module.exports = User