const KoaRouter = require('koa-router');
const services = require('../services/index');
const { getExtensionsList, addExtensions, removeExtensions } = require('../services/extensions-server');
const { getJobList, addJob, stopJob } = require('../services/cron-job');

const router = new KoaRouter();

router
  .get('/', async ctx => {
    ctx.body = { code: '0', info: 'success' };
  })
  .post('/start', async ctx => {
    const { serviceName } = ctx.request.body;
    if (!serviceName) {
      return ctx.body = { code: '1', message: 'serviceName 是必须的参数' };
    }
    ctx.body = await services.start(serviceName);
  })
  .post('/restart', async ctx => {
    const { serviceName } = ctx.request.body;
    if (!serviceName) {
      return ctx.body = { code: '1', message: 'serviceName 是必须的参数' };
    }
    ctx.body = await services.restart(serviceName);
  })
  .post('/stop', async ctx => {
    const { serviceName } = ctx.request.body;
    if (!serviceName) {
      return ctx.body = { code: '1', message: 'serviceName 是必须的参数' };
    }
    ctx.body = await services.stop(serviceName);
  })
  .post('/get_extensions_list', async ctx => {
    ctx.body = await getExtensionsList();
  })
  .post('/add_extensions', async ctx => {
    const { file } = ctx.request.files;
    const { name } = ctx.request.body;
    ctx.body = await addExtensions({ file, name });
  })
  .post('/remove_extensions', async ctx => {
    const { name } = ctx.request.body;
    ctx.body = await removeExtensions(name);
  })
  .post('/get_job_list', async ctx => {
    ctx.body = getJobList();
  })
  .post('/add_job', async ctx => {
    const { serviceName, time } = ctx.body;
    ctx.body = await addJob(time, serviceName);
  })
  .post('/stop_job', async ctx => {
    const { serviceName } = ctx.body;
    ctx.body = await stopJob(serviceName);
  });

module.exports = router;
