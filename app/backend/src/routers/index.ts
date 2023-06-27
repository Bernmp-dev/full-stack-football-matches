import { Router } from 'express';
import matchesRouter from './Matches';
import teamsRouter from './Teams';
import userRouter from './User';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);

export default router;
