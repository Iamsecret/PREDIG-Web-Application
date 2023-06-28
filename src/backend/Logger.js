const pino = require("pino");
const pinoms = require("pino-multi-stream");
const path = require("path");
const CONSTANTS = require("../config/constants.config");

const fs = require("fs");

let dir = path.join(
  __dirname,
  "..",
  "..",
  CONSTANTS.DATA_FOLDER,
  CONSTANTS.LOGS_FOLDER
);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const streams = [
  { stream: process.stdout },
  {
    stream: pino.destination(
      path.join(
        __dirname,
        "..",
        "..",
        CONSTANTS.DATA_FOLDER,
        CONSTANTS.LOGS_FOLDER,
        CONSTANTS.SERVER_LOGS_FILE_NAME
      )
    ),
  },
];

const logger = pinoms(pinoms.multistream(streams));

module.exports = logger;
