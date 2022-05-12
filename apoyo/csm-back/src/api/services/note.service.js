const BaseService = require('./base.service');
let _noteRepository = null;

class NoteService extends BaseService {
    constructor({ NoteRepository }) {
        super(NoteRepository);
                _noteRepository = NoteRepository;
    }
    
    async getNotes(searchQuery) {
        return await _noteRepository.getNotes(searchQuery);
    }
}

module.exports = NoteService;
