const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
    }

    async login(searchQuery) {       
        try {
            const user = await this.model.findByCredentials(searchQuery.username, searchQuery.password) 
            const token = await user.generateAuthToken()
            return { 
                user,
                token
            }
        } catch (err) {
            return { 
                error: err.message 
            }
        }
    }

    async getUsers() {       
        try {
            const users = await this.model.find({})
            return users
        } catch (err) {
            return { 
                error: err.message 
            }
        }
    }
}

module.exports = UserRepository;
