const BaseRepository = require('./base.repository');
let _livejasmin = null;

class LivejasminRepository extends BaseRepository {
    constructor({ Livejasmin }) {
        super(Livejasmin);
        _livejasmin = Livejasmin;
    }
}

module.exports = LivejasminRepository;
