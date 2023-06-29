import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';
import BoardOverall from '../utils/BoardOverall';

const homeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const response = await LeaderBoardService.getLeaderBoard('homeTeam');

    return res.status(200).json(response);
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

const awayLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const response = await LeaderBoardService.getLeaderBoard('awayTeam');

    return res.status(200).json(response);
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

const overallLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const homeResponse = await LeaderBoardService.getLeaderBoard('homeTeam');
    const awayResponse = await LeaderBoardService.getLeaderBoard('awayTeam');
    const response = [...homeResponse, ...awayResponse];

    const result = BoardOverall(response);

    return res.status(200).json(result);
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

export default {
  homeLeaderboard,
  awayLeaderboard,
  overallLeaderboard,
};
