import { Request, Response } from 'express';
import TeamsService from '../services/Teams';

class TeamsController {
  constructor(
    private teamService: TeamsService,
  ) {}

  public async listTeams(_req: Request, res: Response): Promise<Response> {
    const response = await this.teamService.listTeams();
    return res.status(200).json(response);
  }
}

export default TeamsController;
