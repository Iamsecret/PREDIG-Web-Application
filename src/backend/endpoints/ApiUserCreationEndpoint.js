const path = require("path");
const uuid = require("uuid");

const logger = require("../Logger.js");
const db = require("../db/Database");

class ApiUserCreationEndpoint {
  constructor() {
    this.path = "/api/user/create/:email";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting creation for email ${req.params.email}`);

      //TODO: validate email
      const user = await db.users.findOne({
        where: { email: req.params.email },
      });

      if (user === null) {
        const verification_uuid = uuid.v4();
        const deletion_uuid = uuid.v4();
        const user = await db.users.create({
          email: req.params.email,
          verification_uuid: verification_uuid,
          deletion_uuid: deletion_uuid,
        });
        res.json({ msg: user.toJSON() });
      } else {
        res.json({ msg: "There already exists a user with that email." });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiUserCreationEndpoint = new ApiUserCreationEndpoint();

module.exports = apiUserCreationEndpoint;
