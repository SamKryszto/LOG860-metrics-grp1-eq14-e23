module.exports = (sequelize, Sequelize) => {
    const Issue = sequelize.define("Issue", {
        issueId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Sequelize.STRING,
        assignees: Sequelize.ARRAY(Sequelize.STRING),
        labels: Sequelize.ARRAY(Sequelize.STRING),
        milestone: Sequelize.STRING,
        column: Sequelize.STRING,
    });
    return Issue;
};
