const Application = require('./application');
const Router = require('./router/index');

function createApplication() {
  // 需要将 get listen 方法,放到当前应用实例上
  return new Application();
}

createApplication.Router = Router;

module.exports = createApplication;
