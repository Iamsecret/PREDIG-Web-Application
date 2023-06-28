const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const uuid = require("uuid");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./UserDefinition")(sequelize, Sequelize);
db.runs = require("./RunDefinition")(sequelize, Sequelize, db);

db.init = async () => {
  await db.sequelize.sync({ force: false }).then(() => {
    console.log("re-sync db.");
  });
};

module.exports = db;
