const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/v1/api', {
        target: 'http://ec2-54-180-19-153.ap-northeast-2.compute.amazonaws.com:5000/',
        changeOrigin: true
    }));
}