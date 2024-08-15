const express = require('./express');

const app = express();

app.param('id', function (req, res, next, value, key) {
  console.log(value, key);

  req.params.id = value + 10;
  next();
});

app.param('id', function (req, res, next, value, key) {
  console.log(value, key);

  req.params.id = value - 5;
  next();
});

app.param('name', function (req, res, next, value, key) {
  console.log(value, key);

  req.params.name = value + 'cool';
  next();
});

app.get('/zf/:id/:name', function (req, res, next) {
  res.end(JSON.stringify(req.params));
});

app.get('/', function (req, res, next) {
  res.end('ok');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
