const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const archiver = require("archiver");
const db = require("../db/Database");
const CONSTANTS = require("../../config/constants.config");

class ApiRunDataDownloadEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/data/download";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting data for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null) {
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
        req.params.id
      );

      let archive = archiver("zip");

      res.attachment("output_data.zip");

      archive.pipe(res);

      archive.directory(file_path, false);

      CONSTANTS.OUTPUT_SUBFOLDERS.forEach((value) => {
        archive.directory(value, value);
      });

      archive.finalize();
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunDataDownloadEndpoint = new ApiRunDataDownloadEndpoint();

module.exports = apiRunDataDownloadEndpoint;
