const express = require('./express');

const app = express();

app.get(
  '/',
  function (req, res, next) {
    // 包含异步逻辑
    console.log(1);
    next();
  },
  function (req, res, next) {
    console.log(11);
    next();
  },
  function (req, res, next) {
    console.log(111);
    next();
  },
  function (req, res, next) {
    console.log(1111);
    next();
  }
);

app.get('/', function (req, res, next) {
  // 包含异步逻辑
  console.log(2);
  res.end('ok');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
