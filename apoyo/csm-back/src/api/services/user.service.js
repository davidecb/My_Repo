const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository }) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    async login(searchQuery) {
        return await _userRepository.login(searchQuery);
    }

    async getUsers() {
        return await _userRepository.getUsers();
    }

}

module.exports = UserService;
