// 中间件 错误处理, 或者路由出错都统一处理
const express = require('./express');

const app = express();

app.use(function (req, res, next) {
  let flag = Math.random() > 0.5;
  if (flag) {
    next();
  }
  next()
});

app.get('/', (req, res, next) => {
  console.log('/1');
  next('error');
})

app.get('/', (req, res, next) => {
  console.log('/2');
  res.end('/')
})

// 错误处理
app.use((err, req, res, next) => {
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  res.end(err);
})

app.listen(3000, function () {
  console.log('Server is running on port 3000');
})