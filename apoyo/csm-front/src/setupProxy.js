const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );
};
/* 
module.exports = (app) => {
    console.log('proxy-middleware')
    app.use(
        'csm-model-society.herokuapp.com/api',
        createProxyMiddleware({
            target: 'https://csm-modelsociety-server.herokuapp.com/',
            changeOrigin: true
        })
    );
};  */