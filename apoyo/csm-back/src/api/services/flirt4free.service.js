const BaseService = require('./base.service');

class Flirt4FreeService extends BaseService {
    constructor({ Flirt4FreeRepository }) {
        super(Flirt4FreeRepository);
    }
}

module.exports = Flirt4FreeService;
