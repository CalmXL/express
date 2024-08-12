// 中间件的概念 控制是否向下执行 (权限处理)
// 中间件可以拓展 req, res 中的方法
// 中间件可以提前处理逻辑

const express = require('./express');

const app = express();

// express 中间件可以放置路径

// 默认路径 '/'
app.use(function (req, res, next) {
  req.a = 1;
  next();
})

app.use('/', function (req, res, next) {
  req.a++;
  next();
})

app.use('/a', function (req, res, next) {
  req.a++;
  next();
})

app.get('/a', function (req, res, next) {
  res.end(req.a + '');
})

app.get('/', function (req, res, next) {
  res.end(req.a + '');
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
})