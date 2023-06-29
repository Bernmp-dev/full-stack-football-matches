import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.homeLeaderboard);

export default leaderBoardRouter;
