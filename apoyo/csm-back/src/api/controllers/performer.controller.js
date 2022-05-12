const _get = require('lodash/get');
let _performerService = null;

class PerformerController {
    constructor({ PerformerService }) {
        _performerService = PerformerService;
    }

    async create(req, res) {
        console.log(req.role)        
        if (req.role === 'monitor' || req.role === 'financial') {
            res.status(401).json({ error: 'No tienes permisos para realizar esta operacion' })
        }
        const modelName = req.body.modelName        
        const searchQuery = {
            modelName
        }
        const performerExist = await _performerService.getDuplicated(searchQuery)

        if (performerExist.length === 0) {
            const body = _get(req, 'body');
            console.log(body)
            const created = await _performerService.create(body);
            console.log('Creado')
            res.status(201).json({ data: created })            
        } else {
            res.status(400).json({ error: 'La modelo ya existe' })
        }
    }

    async getPaginatedRequest(req, res) {
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
        const retrieved = await _performerService.getPaginatedRequest(query, {}, page, limit, field, value, baseUrl);
        res.status(201).json({ data: retrieved })
    }  
    
    async getPerformers(req, res) {
        
        const fromDate = _get(req, 'query.fromDate');
        const searchQuery = {};
        let searchFilter = {};

        if (fromDate) {
            const date = new Date(fromDate);
            
            date.setMonth(
                date.getMonth() - 6, 
                date.getDate(), 
                date.getHours() - 5
            );
    
            searchQuery.lastDateOnline = {};
    
            searchQuery.lastDateOnline.$gte = date;
    
            searchFilter = {
                modelName: 1,
                location: 1,
                modelShift: 1,
                platformNames: 1,
                _id: 1
            };
        }       


        const retrieved = await _performerService.getPerformers(searchQuery, searchFilter)
        res.status(200).json({ data: retrieved })
    }
    
    async getDuplicated(req, res) {
        const performerNickname = _get(req, 'query.performerNickname');
        const endTime = _get(req, 'query.endTime')
        const searchQuery = {
            performerNickname,
            endTime
        }
        const retrieved = await _performerService.getDuplicated(searchQuery)
        res.status(200).json({ data: retrieved })
    }
}

module.exports = PerformerController;
