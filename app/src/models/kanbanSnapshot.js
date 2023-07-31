module.exports = (sequelize, Sequelize) => {
    const KanbanSnapshot = sequelize.define("KanbanSnapshot", {
        snapshotId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        snapshotDate: Sequelize.DATE,
        repo: Sequelize.STRING,
        owner: Sequelize.STRING,
    });
    return KanbanSnapshot;
};
