const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const archiver = require("archiver");
const db = require("../db/Database");
const CONSTANTS = require("../../config/constants.config");

class ApiSampleFileExperimentalEndpoint {
  constructor() {
    this.path = "/api/sample_files/experimental/:filename";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting experimental sample file ${req.params.filename}`);

      //check if file is allowed
      const allowedFiles = [
        "expe_saccharification_glc.txt",
        "expe_saccharification_xyl.txt",
      ];

      if (!allowedFiles.includes(req.params.filename)) {
        res.sendStatus(404);
        return;
      }

      const file_path = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "data",
        "sample_files",
        req.params.filename
      );

      res.download(file_path);
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiSampleFileExperimentalEndpoint =
  new ApiSampleFileExperimentalEndpoint();

module.exports = apiSampleFileExperimentalEndpoint;
