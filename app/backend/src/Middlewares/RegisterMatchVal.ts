import { NextFunction, Request, Response } from 'express';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import TeamsService from '../services/Teams';

const registerMatchVal = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body as MatchesModel;
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const teamsService = new TeamsService(TeamsModel);
  try {
    await Promise.all([
      teamsService.listTeamById(homeTeamId),
      teamsService.listTeamById(awayTeamId)]);

    next();
  } catch (error) {
    const { message } = error as Error;
    res.status(404).json({ message });
  }
};

export default registerMatchVal;
