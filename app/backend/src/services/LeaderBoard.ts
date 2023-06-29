import BoardInterface from '../Interfaces/BoardInterface';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import { TeamFrom } from '../types/TeamFrom';
import defineAtt from '../utils/BoardAttributes';
import boardParser from '../utils/BoardParser';
import boardSorter from '../utils/BoardSorter';

const getLeaderBoard = async (team: TeamFrom): Promise<BoardInterface[]> => {
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
    attributes: defineAtt(team),
  }) as unknown as BoardInterface[];

  const board = boardParser(matches);
  board.sort(boardSorter);

  return board;
};

export default {
  getLeaderBoard,
};
