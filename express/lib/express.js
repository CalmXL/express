
const Application = require('./application');

function createApplication() {
  // 需要将 get listen 方法,放到当前应用实例上
  return new Application();
}

module.exports = createApplication;
