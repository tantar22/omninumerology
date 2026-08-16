import { createApp } from './app';
import { loadEnvFile } from './lib/env';

loadEnvFile();

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

const app = createApp();

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`OmniNumerology listening on http://${HOST}:${PORT}`);
});
