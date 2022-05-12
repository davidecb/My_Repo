const BaseRepository = require('./base.repository');

class ImLiveRepository extends BaseRepository {
    constructor({ ImLive }) {
        super(ImLive);
    }
}

module.exports = ImLiveRepository;
