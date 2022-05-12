const _get = require('lodash/get');
let _camsodaService = null;

class CamsodaController {
    constructor({ CamsodaService }) {
        _camsodaService = CamsodaService;
    }

    async create(req, res) {
        const body = _get(req, 'body');
        const created = await _camsodaService.create(body);
        res.status(201).json({ data: created })
    }

    async getPaginatedRequest(req, res) {
        const baseUrl = _get(req, 'baseUrl');
        const page = _get(req, 'query.page');
        const limit = _get(req, 'query.limit');
        const field = _get(req, 'query.field');
        const value = _get(req, 'query.value');
        const query = {};
        if(field && value){
            query[field] = value;
        }
        const fromDate = _get(req, 'query.fromDate');
        const toDate = _get(req, 'query.toDate');
        if(fromDate && toDate){
            query.endTime = {};
            query.endTime.$gte = fromDate;
            query.endTime.$lte = toDate;
        }
        const retrieved = await _camsodaService.getPaginatedRequest(query, {}, page, limit, field, value, baseUrl);
        res.status(201).json({ data: retrieved })
    }  
    
    async getDuplicated(req, res) {
        const performerNickname = _get(req, 'query.performerNickname');
        const endTime = _get(req, 'query.endTime');
        const searchQuery = {
            performerNickname,
            endTime
        };
        const retrieved = await _camsodaService.getDuplicated(searchQuery);
        res.status(201).json({ data: retrieved })
    }
}

module.exports = CamsodaController;
