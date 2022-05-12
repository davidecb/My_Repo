class TestService {
    constructor() {}

    get() {
        console.log('@service layer')
        const response = { "hello": "!!!!@@world@@!!!!" };
        return response;
    }

    create(body) {
        console.log('@service layer')
        const response = body;
        return response;
    }

    getQueryParams(params) {
        console.log('@service layer')
        const response = params;
        return response;
    }

    getQueryString(query) {
        console.log('@service layer')
        const response = query;
        return response;
    }
}

module.exports = TestService;
