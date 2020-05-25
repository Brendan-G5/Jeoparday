const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const router = require('./router');

const port = process.env.SERVER_PORT || 3000;

const app = new Koa();

app.use(cors);
app.use(bodyParser());
app.use(router.routes());


app.listen(port, () => {
  console.log(`Sever running at http://localhost:${port}`)
});