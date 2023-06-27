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

const finishMatch = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await MatchesService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

const updateMatch = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await MatchesService.updateMatch(Number(id), req.body);

    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

const registerMatch = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = await MatchesService.registerMatch(req.body);

    return res.status(201).json(response);
  } catch (error) {
    const { message } = error as Error;
    return res.status(400).json({ message });
  }
};

export default {
  listMatches,
  finishMatch,
  updateMatch,
  registerMatch,
};
