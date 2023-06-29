import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';
import boardSorter from '../utils/BoardSorter';

const homeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const response = await LeaderBoardService.getleaderboard('homeTeam');
    response.sort(boardSorter);

    return res.status(200).json(response);
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

export default { homeLeaderboard };
