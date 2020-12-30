// const { getExtensionsList } = require('../services/extensions-server');
//
// (
//   async function f() {
//     const res = await getExtensionsList()
//     console.log(res);
//   }
// )();

// const fs = require('fs');
const path = require('path');
//
// fs.unlinkSync(path.join(__dirname, '../extends', 'aa.js'));

const { rm } = require('../lib/util');

(async () => {
  await rm(path.join(__dirname, '../extends', 'app'))
})();
