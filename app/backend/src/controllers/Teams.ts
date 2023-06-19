import { Request, Response } from 'express';
import TeamsService from '../services/Teams';

class TeamsController {
  constructor(
    private teamService: TeamsService,
  ) {}

  async listTeams(_req: Request, res: Response): Promise<Response> {
    const response = await this.teamService.listTeams();
    return res.status(200).json(response);
  }

  async listTeamById({ params: { id } }: Request, res: Response): Promise<Response> {
    try {
      const response = await this.teamService.listTeamById(Number(id));
      return res.status(200).json(response);
    } catch (error) {
      const { message } = error as Error;
      return res.status(404).json({ message });
    }
  }
}

export default TeamsController;
