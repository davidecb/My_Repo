const BaseService = require('./base.service');

class CamsodaService extends BaseService {
    constructor({ CamsodaRepository }) {
        super(CamsodaRepository);
    }
}

module.exports = CamsodaService;
