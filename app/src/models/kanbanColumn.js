module.exports = (sequelize, Sequelize) => {
    const KanbanColumn = sequelize.define("KanbanColumn", {
        columnId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        issuesCount: Sequelize.STRING
    });
    return KanbanColumn;
};
