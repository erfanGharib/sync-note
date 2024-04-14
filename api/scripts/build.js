import { exec } from 'child_process';
import fs from 'fs-extra';
import { join } from "path";

// build src dir into dist using swc
const addRootPath = (_path = '') => {
  if (_path === '' && !_path) throw 'no path specified on `addRootPath`';
  return join(process.cwd(), '../', _path);
}
const logError = (condition = false, message = '') => {
  if(condition) {
     console.error(message + '\n');
     process.exit(1)
  }
}
;(async () => {
  const isWatch = process.argv[2] === '--watch';
  const swcMainFilePath = addRootPath('node_modules/@swc/cli/bin/swc.js');
  const swcOpts = `${isWatch ? '-w' : ''} --copy-files -C module.type=es6`;
  fs.removeSync(addRootPath('./api/dist'));

  logError(
     !fs.existsSync(addRootPath('./api/src')),
     'No `src` folder exist at root level'
  )
  logError(
     !fs.existsSync(swcMainFilePath),
     'local SWC package not found. please install SWC and run script again. \nnpm i -D @swc/cli @swc/core'
  )

  const dirs = [
    'src -d dist/api/src',
    '../shared -d dist',
  ]

  dirs.forEach(val => {
    exec(`swc ${val} ${swcOpts}`);
  });
})()