// sequelize.js

const Sequelize = require('sequelize');

// Initialize Sequelize with the database connection details
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'postgres',
  dialect: 'postgres',
});

// Define your models
const Task = sequelize.define('Task', {
  taskId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  status: Sequelize.STRING,
});

const PullRequest = sequelize.define('PullRequest', {
  prId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  author: Sequelize.STRING,
  status: Sequelize.STRING,
});

// Define associations between models (if applicable)
// For example, if a Task has a foreign key column referencing a PullRequest:
Task.belongsTo(PullRequest, { foreignKey: 'prId' });
PullRequest.hasMany(Task, { foreignKey: 'prId' });

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = {
  sequelize,
  Task,
  PullRequest,
};