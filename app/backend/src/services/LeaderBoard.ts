import BoardInterface from '../Interfaces/BoardInterface';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import homeBoardAtt from '../utils/BoardAttributes';

const getleaderboard = async (team: string): Promise<BoardInterface[]> => {
  const matches = await MatchesModel.findAll({
    where: { inProgress: false },
    raw: true,
    nest: true,
    include: [{
      model: TeamsModel,
      as: `${team}`,
      attributes: { exclude: ['teamName', 'id'] },
    }],
    group: [`${team}.id`, `${team}.team_name`],
    attributes: homeBoardAtt,
  }) as unknown as BoardInterface[];

  return matches;
};

export default {
  getleaderboard,
};
