let _testService = null;

class TestController {
    constructor({ TestService }) {
        _testService = TestService;
    }

    get(req, res) {
        const response = _testService.get();
        res.send(response);
    }

    create(req, res) {
        console.log('@req: ', req);
        const body = req && req.body || {};
        const response = _testService.create(body);
        res.send(response);
    }

    getQueryParams(req, res) {
        const params = req && req.params || {};
        const response = _testService.getQueryParams(params);
        res.send(response);
    }

    getQueryString(req, res) {
        const query = req && req.query || {};
        const response = _testService.getQueryString(query);
        res.send(response);
    }
}

module.exports = TestController;
