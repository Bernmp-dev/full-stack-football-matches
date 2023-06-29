import { Router } from 'express';
import leaderBoardRouter from './LeaderBoard';
import matchesRouter from './Matches';
import teamsRouter from './Teams';
import userRouter from './User';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderBoard', leaderBoardRouter);

export default router;
