const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://fw3efsadfcv.shop/api',
      changeOrigin: true,
    })
  );
};