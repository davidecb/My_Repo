const BaseRepository = require('./base.repository');

class CamsodaRepository extends BaseRepository {
    constructor({ Camsoda }) {
        super(Camsoda);
    }
}

module.exports = CamsodaRepository;
