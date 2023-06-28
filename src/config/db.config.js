module.exports = {
  USER: "root",
  PASSWORD: process.env.MARIADB_ROOT_PASSWORD,
  HOST: process.env.DB_HOST,
  port: "3306",
  DB: process.env.MARIADB_DATABASE,
  dialect: process.env.DB_DIALECT,
};
