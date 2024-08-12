const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');

function Router() {
  this.stack = [];
}

Router.prototype.route = function (path) {
  let route = new Route();
  // 给当前调用 get 方法放入一个层
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route; // 每个层具有一个 route, 并标识它是一个路由
  this.stack.push(layer);
  return route;
};

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    let route = this.route(path);
    route[method](handlers);
  }
})

// Router.prototype.get = function (path, handlers) {
//   let route = this.route(path); // 构建一个 route
//   route.get(handlers);
// };

Router.prototype.handle = function (req, res, out) {
  // 处理请求的方法
  let { pathname } = url.parse(req.url);
  let idx = 0;
  // express  需要通过 dispatch
  let dispatch = () => {
    // 路由处理不了,交给应用层处理
    if (idx === this.stack.length) return out();

    let layer = this.stack[idx++];

    if (layer.match(pathname) && layer.route.methods[req.method.toLowerCase()]) {
      // 区分职责, 匹配需要 layer 来做, 路由系统只负责存储层和调用层
      layer.handle_request(req, res, dispatch);
    } else {
      dispatch();
    }
  };

  dispatch();
};

module.exports = Router;
