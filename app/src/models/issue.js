module.exports = (sequelize, Sequelize) => {
    const Issue = sequelize.define("Issue", {
        issueId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        asssignees: Sequelize.ARRAY(Sequelize.STRING),
        labels: Sequelize.ARRAY(Sequelize.STRING),
        milestones: Sequelize.ARRAY(Sequelize.STRING),
        status: Sequelize.STRING,
    });
    return Issue;
};
