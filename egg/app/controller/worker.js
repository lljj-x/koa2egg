const Controller = require('egg').Controller;

class WorkerController extends Controller {
  async index() {
    await this.ctx.render('worker/index.tpl', { pid: process.pid });
  }
}

module.exports = WorkerController;
