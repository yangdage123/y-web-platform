const CronJob = require('cron').CronJob;
const { start, stop } = require('./index');

const jobCache = new Map();

function createJob(time, fn) {
  return new CronJob(time, fn, null, true, 'Asia/Shanghai');
}

exports.addJob = function startJob(time, jobName) {
  const cb = () => (start(jobName));
  let job = jobCache.get(jobName);
  if (!job) {
    job = createJob(time, cb);s
  } else {
    job.fireOnTick = cb;
  }
  jobCache.set(jobName, job);
  return { code: '0', info: {} };
};

exports.stopJob = async function stopJob(jobName) {
  let job = jobCache.get(jobName);
  if (!job) {
    return { code: '1', info: {}, msg: '不存在该job' };
  }
  job.stop();
  await stop(jobName);
  jobCache.delete(jobName);
  return { code: '0', info: {} };
};

exports.once = function onceJob(time, jobName) {
  let job = jobCache.get(jobName);
  const cb = async () => {
    await start(jobName);
    job.stop();
    await stop(jobName);
    jobCache.delete(time);
  };
  if (!job) {
    job = createJob(time, cb);
  } else {
    job.fireOnTick = cb;
  }
  jobCache.set(jobName, job);
  return { code: '0', info: {} };
};


exports.getJobList = function getJobList() {
  const list = jobCache.keys();
  return { code: '0', info: { jobList: list } };
};

