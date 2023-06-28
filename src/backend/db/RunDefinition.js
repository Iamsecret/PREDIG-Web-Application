module.exports = (sequelize, Sequelize, db) => {
  const Run = sequelize.define("run", {
    created_by: {
      type: Sequelize.STRING,
    },
    uuid: {
      type: Sequelize.STRING(36),
      allowNull: false,
    },
    start_uuid: {
      type: Sequelize.STRING(36),
      allowNull: false,
    },
    started_at: {
      type: Sequelize.DATE,
    },
    finished_at: {
      type: Sequelize.DATE,
    },
    is_fitting: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    is_animation: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Run;
};
