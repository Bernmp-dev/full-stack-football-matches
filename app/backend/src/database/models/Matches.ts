import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamsModel from './Teams';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeam: TeamsModel;
  declare awayTeam: number;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId' });

export default MatchesModel;
