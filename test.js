const pathToRegExp = require('path-to-regexp');

let configUrl = '/zf/:id/:name';
let requestUrl = '/zf/1/2';
let keys = [];

const reg = pathToRegExp(configUrl, keys);
console.log(keys);
console.log(reg);

const res = requestUrl.match(reg);
console.log(res);




// 核心思路, 就是将用户的配置转化成正则, 和当前的请求路径匹配,拿到结果
// const reqUrl = '/zf/1/2';

// const newUrl = url.replace(/:([^\/]+)/g, function () {
//   keys.push(arguments[1]);
//   return '([^\/]+)'
// })

// console.log(newUrl);

// const reg = new RegExp(newUrl);

// let [, ...args] = reqUrl.match(reg)

// console.log(args);
// const res = reqUrl.match(/\/zf\/(.+)\/(.+)/);

// console.log(res);
