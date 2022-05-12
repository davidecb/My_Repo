const _get = require('lodash/get');
let _noteService = null;

class NoteController {
    constructor({ NoteService }) {
        _noteService = NoteService;
    }

    async create(req, res) {
        const body = _get(req, 'body');
        const created = await _noteService.create(body);
        res.status(201).json({ data: created })
    }

    async getNotes(req, res) {
        const fromDate = _get(req, 'query.fromDate');
        const toDate = _get(req, 'query.toDate');        
        const query = {};

        if(fromDate && toDate){
            query.noteDate = {};
            query.noteDate.$gte = new Date(fromDate);
            query.noteDate.$lte = new Date(toDate);
        }

        const retrieved = await _noteService.getNotes(query);
        res.status(201).json({ data: retrieved })
    }  
    
    async getDuplicated(req, res) {
        const performerNickname = _get(req, 'query.performerNickname');
        const endTime = _get(req, 'query.endTime');
        const searchQuery = {
            performerNickname,
            endTime
        };
        const retrieved = await _noteService.getDuplicated(searchQuery);
        res.status(201).json({ data: retrieved })
    }
}

module.exports = NoteController;
