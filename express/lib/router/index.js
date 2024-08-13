const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');

function Router() { // express.Router 返回的结果会放到 use 上, app.use
  let router = (req, res, next) => {
    router.handle(req, res, next);
  }
  router.stack = [];

  router.__proto__ = proto;
  return router; // 通过原型链进行查找
}

let proto = {};

proto.route = function (path) {
  let route = new Route();
  // 给当前调用 get 方法放入一个层
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route; // 每个层具有一个 route, 并标识它是一个路由
  this.stack.push(layer);
  return route;
};

proto.use = function (path, handler) {
  // 中间件会放到当前的路由系统中
  if (typeof path === 'function') {
    handler = path;
    path = '/'; // 给 path 默认值
  }

  let layer = new Layer(path, handler);
  layer.route = undefined; // 如果 route 是 undefined, 则代表为中间件
  this.stack.push(layer);
};

methods.forEach((method) => {
  console.log('router');

  proto[method] = function (path, handlers) {
    let route = this.route(path);
    route[method](handlers);
  };
});

proto.handle = function (req, res, out) {
  // 处理请求的方法
  let { pathname } = url.parse(req.url);
  let idx = 0;
  // express  需要通过 dispatch
  let dispatch = (err) => {
    // 路由处理不了,交给应用层处理
    if (idx === this.stack.length) return out();
    let layer = this.stack[idx++];

    if (err) {
      // 用户传入了错误, 需要一直往下查找, 错误处理中间件
      if (!layer.route) {
        // 错误中间件的处理函数的参数需要有四个
        return layer.handle_error(err, req, res, dispatch);
      } else {
        dispatch(err); // 路由忽略
      }
    } else {
      // 路由,中间件 都需要匹配路径才执行
      if (layer.match(pathname)) {
        // 排除错误中间件
        if (!layer.route && layer.handler.length !== 4) {
          // 中间件处理
          layer.handle_request(req, res, dispatch);
        } else {
          if (!layer.route) return dispatch();
          if (layer.route.methods[req.method.toLowerCase()]) {
            req.params = layer.params;
            layer.handle_request(req, res, dispatch);
          } else {
            dispatch();
          }
        }
      } else {
        dispatch();
      }
    }
  };

  dispatch();
};

module.exports = Router;
