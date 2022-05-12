const _get = require('lodash/get');
let _streamateService = null;

class StreamateController {
    constructor({ StreamateService }) {
        _streamateService = StreamateService;
    }

    async create(req, res) {
        const body = _get(req, 'body');
        const created = await _streamateService.create(body);
        res.status(201).json({ data: created })
    }

    async getPaginatedRequest(req, res) {
        const baseUrl = _get(req, 'baseUrl');
        const page = _get(req, 'query.page');
        const limit = _get(req, 'query.limit');
        const field = _get(req, 'query.field');
        const value = _get(req, 'query.value');
        const query = {};
        const fromDate = _get(req, 'query.fromDate');
        const toDate = _get(req, 'query.toDate');
        if(fromDate && toDate){
            query.endTime = {};
            query.endTime.$gte = fromDate;
            query.endTime.$lte = toDate;
        }
        const retrieved = await _streamateService.getPaginatedRequest(query, {}, page, limit, field, value, baseUrl);
        res.status(201).json({ data: retrieved })
    }

    async getDuplicated(req, res) {
        const transactionId = _get(req, 'query.transactionId');
        const searchQuery = {
            transactionId
        };
        const retrieved = await _streamateService.getDuplicated(searchQuery);
        res.status(201).json({ data: retrieved })
    }
}

module.exports = StreamateController;
