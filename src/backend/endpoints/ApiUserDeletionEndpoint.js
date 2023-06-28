const path = require("path");

const logger = require("../Logger.js");
const db = require("../db/Database");

class ApiUserDeletionEndpoint {
  constructor() {
    this.path = "/api/user/delete/:deletionUuid";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting deletion for UUID ${req.params.deletionUuid}`);

      let user = await db.users.findOne({
        where: { deletion_uuid: req.params.deletionUuid },
      });
      let runs = await db.runs.update(
        { created_by: "" },
        { where: { created_by: user.email } }
      );

      logger.info(runs);

      if (user === null) {
        res.json({
          msg:
            "This deletion UUID " +
            req.params.deletionUuid +
            " does not exist.",
        });
      } else {
        let email = user.email;
        await user.destroy();
        res.json({ msg: "Your email " + email + " is now deleted." });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiUserDeletionEndpoint = new ApiUserDeletionEndpoint();

module.exports = apiUserDeletionEndpoint;
