import {
  CreationOptional,
  INTEGER,
  Model,
  STRING,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamsModel;
