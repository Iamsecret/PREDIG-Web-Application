const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const archiver = require("archiver");
const db = require("../db/Database");
const CONSTANTS = require("../../config/constants.config");

class ApiRunAnimationDownloadEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/animation/download";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting animation for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null || !run.is_animation) {
        res.sendStatus(404);
        return;
      }

      const file_path = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "data",
        "runs",
        req.params.id,
        "animation.mp4"
      );

      res.download(file_path);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunAnimationDownloadEndpoint = new ApiRunAnimationDownloadEndpoint();

module.exports = apiRunAnimationDownloadEndpoint;
