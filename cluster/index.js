const cluster = require('cluster');
const http = require('http');
// const numCPUs = require('os').cpus().length;
const numCPUs = 2;

// 测试多进程独立内存
let visits = 0;
if (cluster.isMaster) {
  console.log(`主进程已启动 pid: ${process.pid}`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    console.log(`主进程send#${worker.id}: say hi`);

    // 在主进程中，这会发送消息给特定的工作进程。 相当于 ChildProcess.send()。
    // 在工作进程中，这会发送消息给主进程。 相当于 process.send()。
    worker.send(`hi worker${worker.id}`);

    worker.on('message', msg => {
      console.log(`msg: ${msg} from worker#${worker.id} pid ${worker.process.pid}`);
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  console.log(`工作进程已启动 worker#${cluster.worker.id} pid: ${process.pid}`);

  process.on('message', (msg) => {
    console.log(`get: ${msg}`);
    process.send(msg);
  });

  // process.on === cluster.worker.on ?
  // cluster.worker.on('message', (msg) => {
  //   console.log(`get: ${msg}`);
  //   cluster.worker.send(msg);
  // });

  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    visits ++;
    res.writeHead(200);
    res.end(`
      <html>
        <head>
          <title>Worker</title>
          <meta charset="utf-8" />
          <link rel="icon" sizes="32x32" type="image/png" href="//static.nodejs.cn/_static/img/favicon.png">
        </head>
        <body>
            <h1>进程 Pid: ${process.pid}</h1>
            <div style="margin-top: 20px;">
                visits: ${visits}
            </div>
        </body>
      </html>
    `)
  }).listen(8000);
}
