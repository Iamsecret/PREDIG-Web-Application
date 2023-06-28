const uuid = require("uuid");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");
const test = require("../index.js");

const logger = require("../Logger.js");
const InputFileBuilder = require("../InputFileBuilder.js");
const PARAMETER_DEFINITIONS = require("../../config/param.config");
const createDirectoryStructure = require("../DirectoryHelper");
const emailService = require("../EmailService");
const CONSTANTS = require("../../config/constants.config");
const db = require("../db/Database");

const { runSimulation, runFitting } = require("../SimulationRunner.js");

class ApiRunsStartEndpoint {
  constructor() {
    this.path = "/api/runs/start/:start_uuid";
  }

  async callback(req, res) {
    try {
      let start_uuid = req.params.start_uuid;

      const run = await db.runs.findOne({ where: { start_uuid: start_uuid } });

      if (run === null) {
        res.sendStatus(404);
        return;
      } else {
        if (run.is_fitting) {
          fittingQueue.push(() => runFitting(run.uuid, run.created_by));
        } else {
          simulationQueue.push(() =>
            runSimulation(run.uuid, run.created_by, run.is_animation)
          );
        }
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunsStartEndpoint = new ApiRunsStartEndpoint();

module.exports = apiRunsStartEndpoint;
