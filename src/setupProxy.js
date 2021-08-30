const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://fw3efsadfcv.shop/api',
      changeOrigin: true,
    })
  );
};