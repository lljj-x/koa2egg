/**
 * Created by Liu.Jun on 2021/5/26 18:29.
 */

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello word !'
});

const port = 3131;
app.listen(port);
console.log(`Lister: ${port}`);
