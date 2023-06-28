const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const db = require("../db/Database");

class ApiRunEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null) {
        res.sendStatus(404);
        return;
      }

      res.send(run);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunEndpoint = new ApiRunEndpoint();

module.exports = apiRunEndpoint;
