// sequelize.js

const Sequelize = require("sequelize");

// Initialize Sequelize with the database connection details
const sequelize = new Sequelize("postgres", "postgres", "postgres", {
    host: "postgres",
    dialect: "postgres",
});

// inspired by https://www.bezkoder.com/node-express-sequelize-postgresql/
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.kanbanSnapshots = require("./kanbanSnapshot")(sequelize, Sequelize);
db.issues = require("./issue")(sequelize, Sequelize);

// Define associations between models (if applicable)
// For example, if a Task has a foreign key column referencing a PullRequest:
db.kanbanSnapshots.hasMany(db.issues, { foreignKey: "snapshotId" });

db.sync = async () => {
    // Sync the models with the database
    try {
        await sequelize.sync({ force: true });
        console.log("Database synced");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

module.exports = db;
