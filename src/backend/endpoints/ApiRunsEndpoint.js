const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const db = require("../db/Database");

class ApiRunsEndpoint {
  constructor() {
    this.path = "/api/runs";
  }

  async callback(req, res) {
    try {
      logger.info("Requesting list of all runs...");

      const runs = await db.runs.findAll();

      res.send(runs);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunsEndpoint = new ApiRunsEndpoint();

module.exports = apiRunsEndpoint;
