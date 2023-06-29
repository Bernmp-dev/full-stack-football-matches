import { FindAttributeOptions, Sequelize } from 'sequelize';

const homeBoardAtt: FindAttributeOptions = [

  [Sequelize.col('homeTeam.team_name'), 'name'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals > away_team_goals 
  THEN 3
  WHEN home_team_goals = away_team_goals
  THEN 1 ELSE 0 END`)), 'totalPoints'],

  [Sequelize.fn('COUNT', Sequelize.col('home_team_id')), 'totalGames'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals > away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalVictories'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals = away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalDraws'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals < away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalLosses'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals > 0 
  THEN home_team_goals ELSE 0 END`)), 'goalsFavor'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN away_team_goals > 0 
  THEN away_team_goals ELSE 0 END`)), 'goalsOwn'],

  [Sequelize.fn('SUM', Sequelize
    .literal('home_team_goals - away_team_goals')), 'goalsBalance'],

  [Sequelize.literal(`
  ROUND((SUM(
    CASE WHEN home_team_goals > away_team_goals 
    THEN 3 
    WHEN home_team_goals = away_team_goals
    THEN 1 
    ELSE 0 END) / (COUNT(home_team_id) * 3)) * 100, 2)`),
  'efficiency'],

];

const awayBoardAtt: FindAttributeOptions = [

  [Sequelize.col('awayTeam.team_name'), 'name'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals < away_team_goals 
  THEN 3
  WHEN home_team_goals = away_team_goals
  THEN 1 ELSE 0 END`)), 'totalPoints'],

  [Sequelize.fn('COUNT', Sequelize.col('away_team_id')), 'totalGames'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals < away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalVictories'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals = away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalDraws'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals > away_team_goals 
  THEN 1 ELSE 0 END`)), 'totalLosses'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN away_team_goals > 0 
  THEN away_team_goals ELSE 0 END`)), 'goalsFavor'],

  [Sequelize.fn('SUM', Sequelize.literal(`
  CASE WHEN home_team_goals > 0 
  THEN home_team_goals ELSE 0 END`)), 'goalsOwn'],

  [Sequelize.fn('SUM', Sequelize
    .literal('away_team_goals - home_team_goals')), 'goalsBalance'],

  [Sequelize.literal(`
  ROUND((SUM(
    CASE WHEN home_team_goals < away_team_goals 
    THEN 3 
    WHEN home_team_goals = away_team_goals
    THEN 1 
    ELSE 0 END) / (COUNT(home_team_id) * 3)) * 100, 2)`),
  'efficiency'],

];

const defineAtt = (team: string) => (
  (team === 'homeTeam')
    ? homeBoardAtt
    : awayBoardAtt
);

export default defineAtt;
