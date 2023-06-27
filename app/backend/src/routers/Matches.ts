import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.listMatches);

export default matchesRouter;
