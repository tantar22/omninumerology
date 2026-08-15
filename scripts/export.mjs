// Static-export build for Firebase Hosting. Sets STATIC_EXPORT so next.config.mjs
// enables `output: 'export'` instead of the local dev API rewrites.
process.env.STATIC_EXPORT = '1';

import { spawnSync } from 'node:child_process';

const result = spawnSync('npx next build', {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
