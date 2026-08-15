import { createApp } from './app';
import { loadEnvFile } from './lib/env';

loadEnvFile();

const PORT = Number(process.env.PORT ?? 4000);

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`OmniNumerology API listening on http://localhost:${PORT}`);
});
