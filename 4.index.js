// 带参数的路由
const express = require('./express');

const app = express();

app.get('/zf/:id/:name', function (req, res) {
  console.log(req.params); // id: 1, name: 2
  res.end(JSON.stringify(req.params));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
