// 每个层都有一个 Route 属性
const Layer = require('./layer');
const methods = require('methods');

function Route() {
  this.stack = [];
  this.methods = {}; // 表示当前 route 中有哪些方法 { get: true, post: true }
}

Route.prototype.dispatch = function (req, res, out) {
  let idx = 0;
  let method = req.method.toLowerCase(); // 获取请求的方法
  let dispatch = (err) => {
    if (err) return out(err)
    if (idx === this.stack.length) return out();
    let layer = this.stack[idx++];

    if (method === layer.method) {
      layer.handle_request(req, res, dispatch);
    } else {
      dispatch();
    }
  };

  dispatch();
};

methods.forEach((method) => {
  Route.prototype[method] = function (handlers) {

    handlers.forEach((handler) => {
      let layer = new Layer('/', handler);
      layer.method = method;
      this.methods[method] = true; // 用户绑定方法, 我就记录一下
      this.stack.push(layer);
    });
  };
});

module.exports = Route;
