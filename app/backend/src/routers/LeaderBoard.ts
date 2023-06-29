import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.homeLeaderboard);
leaderBoardRouter.get('/away', LeaderBoardController.awayLeaderboard);
leaderBoardRouter.get('/', LeaderBoardController.overallLeaderboard);

export default leaderBoardRouter;
