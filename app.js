const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const KoaBody = require('koa-body');
const path = require('path');
const cors = require('koa2-cors');

const router = require('./routes');

const app = new Koa();
app.use(koaStatic(path.resolve('./views')));
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 5 * 1024 * 1024,
  }
}));
app.use(cors());
app.use(router.routes());
app.listen(3000, () => console.log('🚀server start! http://localhost:3000'));

