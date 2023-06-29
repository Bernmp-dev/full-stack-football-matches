import BoardInterface from '../Interfaces/BoardInterface';
import boardSorter from './BoardSorter';

export default (boardData: BoardInterface[]) => {
  const overAllData = boardData.reduce((result: BoardInterface[], team) => {
    const existingTeam = result.find((t: BoardInterface) => t.name === team.name);

    if (existingTeam) {
      existingTeam.efficiency = (((existingTeam.totalPoints + team.totalPoints)
        / ((existingTeam.totalGames + team.totalGames) * 3)) * 100).toFixed(2);
      existingTeam.totalPoints += team.totalPoints;
      existingTeam.totalGames += team.totalGames;
      existingTeam.totalVictories += team.totalVictories;
      existingTeam.totalDraws += team.totalDraws;
      existingTeam.totalLosses += team.totalLosses;
      existingTeam.goalsFavor += team.goalsFavor;
      existingTeam.goalsOwn += team.goalsOwn;
      existingTeam.goalsBalance += team.goalsBalance;
    } else { result.push({ ...team }); }

    return result;
  }, []);

  overAllData.sort(boardSorter);

  return overAllData;
};
