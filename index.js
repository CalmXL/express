// 内部不是 es 6 的写法
// express 是一个函数 可以调用这个函数 创建一个应用
const express = require('./express');

const app = express();

// 没有 ctx 对象, 主要是靠 原生的 req, res
app.get('/', (req, res) => {
  console.log(req);

  res.end('/');
});

app.get('/hello', (req, res) => {
  res.end('/hello');
});

// app.all('*', (req, res) => {
//   res.end('*');
// })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
