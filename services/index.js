const { spawn } = require('child_process');
const path = require('path');
const { fs } = require('mz');

function getServiceId(serviceName) {
  const filePath = path.join('./extends', `./${serviceName}/pid`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return null;
}

exports.start = async function start(serviceName) {
  const extensionJs = spawn('node', [path.join('./extends', serviceName, 'index.js')]);
  extensionJs.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  extensionJs.on('close', (code) => {
    fs.writeFileSync(path.join('./extends', serviceName, 'pid'), '', 'utf8');
  });
  fs.writeFileSync(path.join('./extends', serviceName, 'pid'), extensionJs.pid, 'utf8');
  return { code: '0', info: 'success' };
};

exports.stop = async function stop(serviceName) {
  const pid = getServiceId(serviceName);
  if (pid) {
    spawn('kill', [pid]);
  }
  return { code: '0', info: 'success' };
};

exports.restart = async function restart(serviceName) {
  await this.stop(serviceName);
  await this.start(serviceName);
  return { code: '0', info: 'success' };
};

