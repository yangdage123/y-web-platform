const fs  = require('fs');
const path = require('path');

const { rm } = require('../lib/util');

const basePath = path.join('./extends');

async function getDirFiles(dirPath) {
  const d = await fs.promises.opendir(dirPath);
  const files = [];
  for await (const dirent of d) {
    if (dirent.isDirectory()) {
      files.push(dirent.name);
    }
  }
  return files;
}

async function insertExtensions(file, name) {
  const url = path.join(basePath, name);
  await fs.mkdirSync(url);
  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(path.join(url, file.name));
  reader.pipe(upStream);
}

async function removeDir(name) {
  const url = path.join(basePath, name);
  await rm(url);
}

exports.getExtensionsList = async function getExtensionsList() {
  const result = await getDirFiles(basePath);
  return { code: '0', info: { extensionsList: result.map(v => ({ name: v, key: v}))}}
};


exports.addExtensions = async function addExtensions({ file, name }) {
  const result = await getDirFiles(basePath);
  if (result.includes(name)) {
    return { code: '1', info: {}, msg: '存在相同名称' };
  }
  await insertExtensions(file, name);
  return { code: '0', info: {} };
};

exports.removeExtensions = async function removeExtensions(name) {
  const result = await getDirFiles(basePath);
  if (!result.includes(name)) {
    return { code: '1', info: {}, msg: '不存在该名称' };
  }
  await removeDir(name);
  return { code: '0', info: {} };
};



