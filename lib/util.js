const fs = require('fs');
const path = require('path');

exports.rm = async function rm(url) {
  if (!fs.existsSync(url)) {
    return new Error('文件不存在');
  }
  const r = fs.statSync(url).isDirectory();
  if (r) {
    const files = fs.readdirSync(url);
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        await rm(path.join(url, files[i]));
      }
    }
    fs.rmdirSync(url);
  } else {
    fs.unlinkSync(url);
  }
};

