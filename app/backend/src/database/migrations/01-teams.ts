'use strict';

import { INTEGER, Model, QueryInterface, STRING } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model>('teams', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      teamName: {
        type: STRING,
        allowNull: false,
        field: 'team_name'
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('teams');
  }
};