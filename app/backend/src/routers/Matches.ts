import { Router } from 'express';
import AuthMiddleware from '../Middlewares/Auth';
import registerMatchVal from '../Middlewares/RegisterMatchVal';
import MatchesController from '../controllers/Matches';

const matchesRouter = Router();

const authMiddleware = new AuthMiddleware();

matchesRouter.get('/', MatchesController.listMatches);

matchesRouter.patch(
  '/:id/finish',
  (req, res, next) => authMiddleware.validateToken(req, res, next),
  MatchesController.finishMatch,
);

matchesRouter.patch(
  '/:id',
  (req, res, next) => authMiddleware.validateToken(req, res, next),
  MatchesController.updateMatch,
);

matchesRouter.post(
  '/',
  (req, res, next) => authMiddleware.validateToken(req, res, next),
  registerMatchVal,
  MatchesController.registerMatch,
);

export default matchesRouter;
