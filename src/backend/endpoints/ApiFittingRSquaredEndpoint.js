const path = require("path");
const fs = require("fs");
const db = require("../db/Database");
const PARAMETER_DEFINITIONS = require("../../config/param.config.js");

const logger = require("../Logger.js");

class ApiFittingRSquaredEndpoint {
  constructor() {
    this.path = "/api/fitting/runs/:id/rSquared";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting rSquared for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null) {
        return;
      }

      const runFolder = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "data",
        "runs",
        req.params.id
      );

      let rSquaredJSON = {};

      for (let i = 0; i < 5; i++) {
        const rSquaredFile = path.join(
          runFolder,
          "BEST_FIT",
          "fit-stats_data" + (i + 1) + ".txt"
        );
        try {
          const rSquaredData = fs.readFileSync(rSquaredFile, "utf-8");

          let rSquaredDataSplit = rSquaredData.split("\n");

          const glcRSquared = rSquaredDataSplit[0].split(":")[1];
          const xylRSquared = rSquaredDataSplit[1].split(":")[1];

          rSquaredJSON[i] = { glc: glcRSquared, xyl: xylRSquared };
        } catch (error) {
          logger.error(
            `Could not find r squared file for UUID: ${req.params.id}`
          );
          rSquaredJSON[i] = { glc: "N.A.", xyl: "N.A." };
        }
      }

      res.json(rSquaredJSON);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiFittingRSquaredEndpoint = new ApiFittingRSquaredEndpoint();

module.exports = apiFittingRSquaredEndpoint;
