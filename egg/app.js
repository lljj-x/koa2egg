// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
    this.test();
    debugger
  }
  test() {
    console.log('11')
  }
}

module.exports = AppBootHook;
