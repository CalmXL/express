// 每个层都有一个 Route 属性
const Layer = require('./layer');

function Route() {
  this.stack = [];
}

Route.prototype.dispatch = function (req, res, out) {
  let idx = 0;
  let method = req.method.toLowerCase(); // 获取请求的方法
  let dispatch = () => {
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

Route.prototype.get = function (handlers) {
  handlers.forEach((handler) => {
    let layer = new Layer('/', handler);
    layer.method = 'get';
    this.stack.push(layer);
  });
};

module.exports = Route;
