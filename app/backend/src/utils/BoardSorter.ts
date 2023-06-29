import BoardInterface from '../Interfaces/BoardInterface';

const boardSorter = (a: BoardInterface, b: BoardInterface) => (
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || 0
);

export default boardSorter;
