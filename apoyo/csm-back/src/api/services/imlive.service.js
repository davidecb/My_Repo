const BaseService = require('./base.service');

class ImLiveService extends BaseService {
    constructor({ ImLiveRepository }) {
        super(ImLiveRepository);
    }
}

module.exports = ImLiveService;
