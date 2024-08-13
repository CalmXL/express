const express = require('../express');

const article = express.Router(); // es5 中的类可以直接调用

article.get('/add', function (req, res) {
  res.end('article add');
});

article.get('/remove', function (req, res) {
  res.end('article remove');
});

module.exports = article;
