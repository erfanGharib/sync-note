/** @ENTRY_POINT */

import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const isRootPath = () => {
    console.log(path.join(__dirname, '..') , process.cwd());

    if (path.join(__dirname, '..') !== process.cwd())
        throw Error('Invalid Root Directory: run from ./api path')
}

config({ path: path.join(process.cwd(), '.env') });

;(async function() {
    const { bootstrapServer } = await import('./server.js');

    // isRootPath()
    bootstrapServer();
})();
