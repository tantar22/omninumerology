import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import matrixRouter from './routes/matrix.router';
import timingRouter from './routes/timing.router';
import optimizeRouter from './routes/optimize.router';
import synastryRouter from './routes/synastry.router';
import oracleRouter from './routes/oracle.router';
import assistantRouter from './routes/assistant.router';

/** Build and configure the Express application. */
export function createApp(): Express {
  const app = express();
  // The Render build creates this directory. Keeping it optional preserves the
  // API-only development and split-hosting workflows.
  const staticSiteDir = resolve(process.cwd(), 'out');

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'omninumerology',
      time: new Date().toISOString(),
    });
  });

  app.use('/api/matrix', matrixRouter);
  app.use('/api/timing', timingRouter);
  app.use('/api/optimize', optimizeRouter);
  app.use('/api/synastry', synastryRouter);
  app.use('/api/oracle', oracleRouter);
  app.use('/api/assistant', assistantRouter);

  if (existsSync(staticSiteDir)) {
    // In the all-in-one Render deployment, the static Next.js export and the
    // API share one origin. The browser can therefore use its default /api/*
    // paths without CORS or environment configuration.
    // `extensions` makes a statically exported route such as /about.html
    // available at the clean public URL /about.
    app.use(express.static(staticSiteDir, { extensions: ['html'] }));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(resolve(staticSiteDir, 'index.html'));
    });
  } else {
    // Useful when this process is intentionally deployed as an API only.
    app.get('/', (_req: Request, res: Response) => {
      res.json({
        status: 'ok',
        service: 'omninumerology-api',
        frontend: 'not built',
        health: '/api/health',
      });
    });
  }

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: err.message ?? 'Internal server error' });
  });

  return app;
}
