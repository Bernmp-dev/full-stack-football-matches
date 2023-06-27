import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

const listMatches = async (): Promise<MatchesModel[]> => {
  const response = await MatchesModel.findAll({
    include: [
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
    ] });

  return response;
};

export default {
  listMatches,
};
