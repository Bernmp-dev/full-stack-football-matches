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

const finishMatch = async (id: number): Promise<void> => {
  const [, affectedRows] = await MatchesModel.update(
    { inProgress: false },
    { where: { id }, returning: true },
  );

  if (!affectedRows) throw new Error('Match ongoing');
};

const updateMatch = async (
  id: number,
  goals: MatchesModel[],
): Promise<void> => {
  const [, affectedRows] = await MatchesModel.update(
    { ...goals },
    { where: { id }, returning: true },
  );

  if (!affectedRows) throw new Error('Invalid update');
};

export default {
  listMatches,
  finishMatch,
  updateMatch,
};
