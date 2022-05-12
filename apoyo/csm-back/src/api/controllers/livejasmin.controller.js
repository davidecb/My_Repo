const _get = require('lodash/get');
let _livejasminService = null;

class LivejasminController {
    constructor({ LivejasminService }) {
        _livejasminService = LivejasminService;
    }

    async create(req, res) {
        const body = _get(req, 'body');
        const created = await _livejasminService.create(body);
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
        const retrieved = await _livejasminService.getPaginatedRequest(query, {}, page, limit, field, value, baseUrl);
        res.status(201).json({ data: retrieved })
    }

    async getFromApi(req, res) {
        const obtained = await _livejasminService.getFromApi();
        //const created = await _livejasminService.create(obtained);
        res.status(201).json(obtained)
    }

    async getFromApiRange(req, res) {
        const start = _get(req, 'query.startDate').split("T")[0];
        const startDate = new Date(start);
        const end = _get(req, 'query.endDate').split("T")[0];
        const endDate = new Date(end);
        const loopCount = parseInt(_get(req, 'query.loopCount'));
        const range = _get(req, 'query.range');
        const connectionsRange = [];
        do {
            console.log("@startDate: ", startDate);
            switch (range) {
                case 'minute':
                    startDate.setMinutes(startDate.getMinutes()+loopCount);
                    break;
            
                case 'hour':
                    startDate.setHours(startDate.getHours()+loopCount);
                    break;
            
                case 'day':
                    startDate.setDate(startDate.getDate()+loopCount);
                    break;
            
                default:
                    break;
            }           
             
            try {
                let obtainedActive = "";
                let obtainedInactive = "";
                do {                    
                    obtainedActive = await _livejasminService.getFromApi(startDate, loopCount, range, 'active');
                    let tiempo = new Date();
                    tiempo.setSeconds(tiempo.getSeconds() + 120); 
                    while (new Date().getTime() < tiempo.getTime()) { }
                } while (obtainedActive === "error");
                if (obtainedActive != "duplicated") {
                    connectionsRange.push(obtainedActive);
                    const created = await _livejasminService.create(obtainedActive);
                    console.log('Data Active created');
                }

                do {                    
                    obtainedInactive = await _livejasminService.getFromApi(startDate, loopCount, range, 'inactive');
                    let tiempo = new Date();
                    tiempo.setSeconds(tiempo.getSeconds() + 120); 
                    while (new Date().getTime() < tiempo.getTime()) { }
                } while (obtainedInactive === "error");
                if (obtainedInactive != "duplicated") {
                    connectionsRange.push(obtainedInactive);
                    const created = await _livejasminService.create(obtainedInactive);
                    console.log('Data Inactive created');
                }
            } catch (err) {
                console.log(err);
                console.log('error en controlador');
            }
        } while (startDate <= endDate);
        res.status(201).json(connectionsRange) 
    }

    async getDuplicated(req, res) {
        const startTime = _get(req, 'query.startTime');
        const endTime = _get(req, 'query.endTime');
        const searchQuery = {
            startTime,
            endTime
        };
        const retrieved = await _livejasminService.getDuplicated(searchQuery);
        res.status(201).json({ data: retrieved })
    }
}

module.exports = LivejasminController;
