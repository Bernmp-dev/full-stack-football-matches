import { ModelStatic } from 'sequelize';
import TeamsInterface from '../Interfaces/Team';
import TeamsModel from '../database/models/Teams';

class TeamsService {
  constructor(
    private teamModel: ModelStatic<TeamsModel>,
  ) {}

  public async listTeams(): Promise<TeamsInterface[]> {
    return this.teamModel.findAll();
  }
}

export default TeamsService;
