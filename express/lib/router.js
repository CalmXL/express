const url = require('url');

function Router() {
  this.stack = [];
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    handler,
    method: 'get',
  });
};

Router.prototype.handle = function (req, res, out) {

  for (let i = 0; i < this.stack.length; i++) {
    const { path, method, handler } = this.stack[i];
    let { pathname } = url.parse(req.url);
    let reqMethod = req.method.toLowerCase();

    if (pathname === path && method === reqMethod) {
      return handler(req, res);
    }
  }

  out();
};

module.exports = Router;
