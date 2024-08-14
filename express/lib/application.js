const http = require('http');
const Router = require('./router');
const methods = require('methods');

function Application() {
  // 路由的配置应该归属 应用来进行管理
}

Application.prototype.lazy_route = function () {
  if (!this._router) {
    this._router = new Router();
  }
};

Application.prototype.use = function (path, handler) {
  this.lazy_route();
  this._router.use(path, handler);
};

methods.forEach((method) => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route();
    this._router[method](path, ...handlers);
  };
});

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    // 应用提供一个找不到的方法, 如果路由内部无法匹配
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    // console.log('listen: ', this._router);

    this._router.handle(req, res, done);
  });

  server.listen(...arguments);
};

module.exports = Application;
