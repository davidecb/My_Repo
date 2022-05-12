const BaseRepository = require('./base.repository');

class StreamateRepository extends BaseRepository {
    constructor({ Streamate }) {
        super(Streamate);
    }
}

module.exports = StreamateRepository;
