const http = require('http');
const Router = require('./router');

function Application() {
  // 路由的配置应该归属 应用来进行管理
  this._router = new Router();
}

Application.prototype.get = function (path, handler) {
  this._router.get(path, handler);
};

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    // 应用提供一个找不到的方法, 如果路由内部无法匹配
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }

    this._router.handle(req, res, done);
  });

  server.listen(...arguments);
};

module.exports = Application;
