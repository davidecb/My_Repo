const _get = require('lodash/get');
let _flirt4FreeService = null;

class Flirt4FreeController {
    constructor({ Flirt4FreeService }) {
        _flirt4FreeService = Flirt4FreeService;
    }

    async create(req, res) {
        const body = _get(req, 'body');
        const created = await _flirt4FreeService.create(body);
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
        const retrieved = await _flirt4FreeService.getPaginatedRequest(query, {}, page, limit, field, value, baseUrl);
        res.status(201).json({ data: retrieved })
    }  
    
    async getDuplicated(req, res) {
        const performerNickname = _get(req, 'query.performerNickname');
        const startTime = _get(req, 'query.startTime');
        const endTime = _get(req, 'query.endTime');
        const searchQuery = {
            performerNickname,
            startTime,
            endTime
        };
        const retrieved = await _flirt4FreeService.getDuplicated(searchQuery);
        res.status(201).json({ data: retrieved })
    }
}

module.exports = Flirt4FreeController;
