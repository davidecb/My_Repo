const throwError = require("../helpers/throwError.helper");
const _replace = require("lodash/replace");
const _map = require("lodash/map");

class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async create(entity) {
        return await this.repository.create(entity);
    }
    
    async getPaginatedRequest(query = {}, fieldsToReturn = {}, page = 1, limit = 10, field, value, baseUrl = '') {
        const service = _replace(baseUrl, /\/api\/v([0-9]{0,5})\//g, '');
        const numericPage = parseInt(page);
        const numericLimit = parseInt(limit);
        if (numericPage <= 0) {
            const message = "Page parameter invalid";
            throwError(400, message);
        }

        if (numericLimit <= 0) {
            const message = "Limit parameter invalid";
            throwError(400, message);
        }
        const step = numericPage * numericLimit;
        const skip = step - numericLimit;
        const a = await this.repository.getPaginatedRequest(query, fieldsToReturn);//, skip, numericLimit, field, value);
        const b = _map(a, (element) => {
            return {
                "platform": service,
                ...element._doc
            };
        });
        return b;
    }
    
    async getDuplicated(searchQuery) {
        return await this.repository.getDuplicated(searchQuery);
    }
}

module.exports = BaseService;
