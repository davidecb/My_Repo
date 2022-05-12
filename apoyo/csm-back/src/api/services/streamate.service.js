const BaseService = require('./base.service');

class StreamateService extends BaseService {
    constructor({ StreamateRepository }) {
        super(StreamateRepository);
    }
}

module.exports = StreamateService;
