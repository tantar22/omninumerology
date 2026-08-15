import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import matrixRouter from './routes/matrix.router';
import timingRouter from './routes/timing.router';
import optimizeRouter from './routes/optimize.router';
import synastryRouter from './routes/synastry.router';
import oracleRouter from './routes/oracle.router';
import assistantRouter from './routes/assistant.router';

/** Build and configure the Express application. */
export function createApp(): Express {
  const app = express();

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

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: err.message ?? 'Internal server error' });
  });

  return app;
}
