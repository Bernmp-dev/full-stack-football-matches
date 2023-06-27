import { ModelStatic } from 'sequelize';
import TeamsInterface from '../Interfaces/Team';
import TeamsModel from '../database/models/Teams';

class TeamsService {
  constructor(
    private teamsModel: ModelStatic<TeamsModel>,
  ) {}

  async listTeams(): Promise<TeamsInterface[]> {
    return this.teamsModel.findAll();
  }

  async listTeamById(id: TeamsInterface['id']): Promise<TeamsInterface> {
    const team = await this.teamsModel.findByPk(id);

    if (!team) {
      throw new Error('There is no team with such id!');
    }

    return team;
  }
}

export default TeamsService;
