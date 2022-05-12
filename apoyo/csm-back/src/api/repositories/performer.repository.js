const BaseRepository = require('./base.repository');
let _performer = null;

class PerformerRepository extends BaseRepository {
    constructor({ Performer }) {
        super(Performer);
        _performer = Performer;
    }

    
    async getPerformers(searchQuery, searchFilter) {       
        try {
            const performers = await this.model.find(searchQuery, searchFilter)
            return performers            
        } catch (err) {
            return { 
                error: err.message 
            }
        }
    }
}

module.exports = PerformerRepository;
