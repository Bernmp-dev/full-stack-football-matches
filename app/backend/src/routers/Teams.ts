import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/Teams';
import TeamsModel from '../database/models/Teams';
import TeamsService from '../services/Teams';

const teamsRouter = Router();

const teamsService = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/', (req: Request, res: Response) => teamsController.listTeams(req, res));

export default teamsRouter;
