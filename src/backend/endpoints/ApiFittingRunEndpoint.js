const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const db = require("../db/Database");

class ApiFittingRunEndpoint {
  constructor() {
    this.path = "/api/fitting/runs/:id/";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      res.send(run);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiFittingRunEndpoint = new ApiFittingRunEndpoint();

module.exports = apiFittingRunEndpoint;
