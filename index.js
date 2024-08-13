// 多级路由

const express = require('./express');
const user = require('./routes/user');
const article = require('./routes/article');

const app = express();

/**
 * user     add remove
 * article  add remove
 */

// const user = express.Router();
// const article = express.Router();

// user.get('/add', function (req, res) {
//   res.end('user add');
// });

// user.get('/remove', function (req, res) {
//   res.end('user remove');
// });

// article.get('/add', function (req, res) {
//   res.end('article add');
// });

// article.get('/remove', function (req, res) {
//   res.end('article remove');
// });

app.use('/user', user);
app.use('/article', article);

// app.get('/', (req, res, next) => {
//   res.end('home');
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
