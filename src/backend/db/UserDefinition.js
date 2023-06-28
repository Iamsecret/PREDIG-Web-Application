module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    deletion_uuid: {
      type: Sequelize.STRING(36),
      allowNull: false,
    },
  });

  return User;
};
