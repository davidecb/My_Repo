const BaseRepository = require('./base.repository');
let _note = null;

class NoteRepository extends BaseRepository {
    constructor({ Note }) {
        super(Note);
        _note = Note;
    }
        
    async getNotes(searchQuery) {
        try {
            const notes = await this.model.find(searchQuery).populate({
                path: 'performer',
                select: 'modelName -_id'
            }).populate({
                path: 'owner',
                select: 'name -_id id'
            });
            console.log('@notesPopulated:', notes);
            return notes;
        } catch (err) {
            return { 
                error: err.message 
            }
        }
    }
}

module.exports = NoteRepository;
