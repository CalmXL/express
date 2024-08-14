const pathToRegExp = require('path-to-regexp');

// 每次存储是一个对象
function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
  /**
   * reg 当前路径转化成了正则
   * keys 匹配出来的: 后面的结果
   */
  // 把路径转换成正则
  this.reg = pathToRegExp(this.path, (this.keys = []));
}

Layer.prototype.match = function (pathname) {

  console.log(17, this.path);

  let match = pathname.match(this.reg);
  if (match) {
    // 两个数组合并成对象 [xxx, 1, 2] keys: [{ name:'id'}, {name: 'name'}]
    this.params = this.keys.reduce((memo, current, index) => {
      memo[current.name] = match[index + 1];
      return memo;
    }, {});
    return true;
  }

  if (this.path === pathname) {
    return true;
  }

  // 没有 route 中间件
  if (!this.route) {
    console.log('本次匹配的是中间件');

    if (this.path === '/') {
      return true;
    }
    return pathname.startsWith(this.path + '/');
  }
  return false;
};

Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next);
};

Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length === 4) {
    return this.handler(err, req, res, next);
  } else {
    next(err);
  }
};

module.exports = Layer;
