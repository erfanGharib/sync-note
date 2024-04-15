/** @ENTRY_POINT */

import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

config({ path: path.join(process.cwd(), '.env') });

;(async function() {
    const { bootstrapServer } = await import('./server.js');

    bootstrapServer();
})();
