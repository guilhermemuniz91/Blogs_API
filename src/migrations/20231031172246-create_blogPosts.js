'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING
      },

      content: {
        allowNull: false,
        type: Sequelize.STRING
      },

      user_id: {
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },

      published: {
        type: Sequelize.DATE
      },

      updated: {
        type: Sequelize.DATE
      },

    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};