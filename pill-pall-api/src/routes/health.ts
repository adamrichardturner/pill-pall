import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    message: 'Pill Pall API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
