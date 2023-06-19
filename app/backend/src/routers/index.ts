import { Router } from 'express';
import teamsRouter from './Teams';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
