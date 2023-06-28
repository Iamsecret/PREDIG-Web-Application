const path = require("path");
const fs = require("fs");
const db = require("../db/Database");
const logger = require("../Logger.js");
const archiver = require("archiver");

class ApiRunParametersDownloadEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/parameters/download";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters for UUID ${req.params.id}`);

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
        req.params.id,
        "Params"
      );

      let archive = archiver("zip");

      res.attachment("parameters.zip");

      archive.pipe(res);

      archive.directory(file_path, false);

      archive.finalize();
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunParametersDownloadEndpoint = new ApiRunParametersDownloadEndpoint();

module.exports = apiRunParametersDownloadEndpoint;
