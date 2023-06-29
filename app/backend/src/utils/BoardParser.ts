import BoardInterface from '../Interfaces/BoardInterface';

export default (board: BoardInterface[]): BoardInterface[] => {
  const convertedBoard: BoardInterface[] = [];

  board.forEach((team) => {
    const convertedTeam: BoardInterface = {
      ...team,
      totalPoints: Number(team.totalPoints),
      totalGames: Number(team.totalGames),
      totalVictories: Number(team.totalVictories),
      totalDraws: Number(team.totalDraws),
      totalLosses: Number(team.totalLosses),
      goalsFavor: Number(team.goalsFavor),
      goalsOwn: Number(team.goalsOwn),
      goalsBalance: Number(team.goalsBalance),
      // efficiency: parseFloat(String(team.efficiency)),
    };

    convertedBoard.push(convertedTeam);
  });

  return convertedBoard;
};
