const path = require("path");
const fs = require("fs");
const db = require("../db/Database");
const PARAMETER_DEFINITIONS = require("../../config/param.config.js");

const logger = require("../Logger.js");

class ApiFittingParametersToFitEndpoint {
  constructor() {
    this.path = "/api/fitting/runs/:id/parametersToFit";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters to fit for UUID ${req.params.id}`);

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

      const initParametersFile = path.join(
        runFolder,
        "init_params_to_randomize.txt"
      );
      const kineticParametersFile = path.join(
        runFolder,
        "kin_params_to_randomize.txt"
      );

      const initDataFile = fs.readFileSync(initParametersFile, "utf-8");
      const kineticDataFile = fs.readFileSync(kineticParametersFile, "utf-8");

      const initList = initDataFile.split("\t");
      const kineticList = kineticDataFile.split("\t");

      res.json({
        initList: initList,
        kineticList: kineticList,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiFittingParametersToFitEndpoint =
  new ApiFittingParametersToFitEndpoint();

module.exports = apiFittingParametersToFitEndpoint;
