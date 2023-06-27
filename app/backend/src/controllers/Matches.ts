import { Request, Response } from 'express';
import MatchesService from '../services/Matches';

const listMatches = async (req: Request, res: Response): Promise<Response> => {
  try {
    const inProgressFilter = req.query.inProgress ?? null;
    let response = await MatchesService.listMatches();

    response = (inProgressFilter)
      ? response.filter(({ inProgress }) => String(inProgress) === inProgressFilter)
      : response;

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: 'Database Error' });
  }
};

export default {
  listMatches,
};
