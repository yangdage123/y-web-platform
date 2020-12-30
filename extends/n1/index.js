const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();

console.log(path.resolve('./extends/n1'));
app.use(koaStatic(path.resolve('./extends/n1')));
app.listen(3001, () => console.log('3001 is start'));
