const path = require("path");
const {
  SIMULATION_SACCARIFICATION_PLOT_NAME,
  SIMULATION_ENZYME_ACTIVITY_PLOT_NAME,
} = require("../../config/constants.config.js");
const db = require("../db/Database.js");
const logger = require("../Logger.js");

class ApiPlotsEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/plots/:filename";
  }

  async callback(req, res) {
    try {
      logger.info(
        `Requesting file ${req.params.filename} for UUID ${req.params.id}`
      );

      //check if run exists
      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null) {
        res.sendStatus(404);
        return;
      }

      //check if file is allowed
      const allowedFiles = [
        SIMULATION_SACCARIFICATION_PLOT_NAME,
        SIMULATION_ENZYME_ACTIVITY_PLOT_NAME,
      ];

      if (!allowedFiles.includes(req.params.filename)) {
        res.sendStatus(404);
        return;
      }

      res.sendFile(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "data",
          "runs",
          req.params.id,
          "Figures",
          req.params.filename
        ),
        function (err) {
          if (err) {
            logger.info(
              `Error requesting file ${req.params.filename} for UUID ${req.params.id}`
            );
            res.sendStatus(404);
          }
        }
      );
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiPlotsEndpoint = new ApiPlotsEndpoint();

module.exports = apiPlotsEndpoint;
