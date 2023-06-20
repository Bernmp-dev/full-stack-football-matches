import { Router } from 'express';
import teamsRouter from './Teams';
import userRouter from './User';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
