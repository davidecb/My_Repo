const BaseService = require('./base.service');
let _performerRepository = null;

class PerformerService extends BaseService {
    constructor({ PerformerRepository }) {
        super(PerformerRepository)
        _performerRepository = PerformerRepository;
    }

    async getPerformers(searchQuery, searchFilter) {
        return await _performerRepository.getPerformers(searchQuery, searchFilter);
    }
}

module.exports = PerformerService;
