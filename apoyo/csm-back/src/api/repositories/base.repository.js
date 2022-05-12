class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(entity) {
        try {
            return await this.model.create(entity)           
        } catch (err) {
            console.error(err)
        }
    }

    async getPaginatedRequest(query, fieldsToReturn) { 
        return await this.model.find(query, fieldsToReturn).sort( { performerNickname: 1 } )
    }
        
    async getDuplicated(searchQuery) {
        return await this.model.find(searchQuery);
    }
}

module.exports = BaseRepository;
