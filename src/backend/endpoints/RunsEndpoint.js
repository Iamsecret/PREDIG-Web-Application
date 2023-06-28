const uuid = require("uuid");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const InputFileBuilder = require("../InputFileBuilder.js");
const PARAMETER_DEFINITIONS = require("../../config/param.config");
const { createDirectoryStructure } = require("../DirectoryHelper");
const emailService = require("../EmailService");
const CONSTANTS = require("../../config/constants.config");
const db = require("../db/Database");

class RunsEndpoint {
  constructor() {
    this.path = "/runs";
  }

  async callback(req, res) {
    try {
      const runUuid = uuid.v4();
      logger.info(runUuid);

      createDirectoryStructure(runUuid);

      const form = new formidable.IncomingForm();

      const dataFolder = path.join(
        __dirname,
        "..",
        "..",
        "..",
        CONSTANTS.DATA_FOLDER
      );
      const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, runUuid);
      const paramsFolder = path.join(runFolder, CONSTANTS.PARAMS_FOLDER);

      let email = "";
      let is_animation = false;

      form.parse(req, async (err, fields, files) => {
        let inputFileBuilder = new InputFileBuilder(fields);
        email = fields.email;
        is_animation = fields.is_animation;

        let kinFileString = inputFileBuilder.buildKinematicParameterString();
        fs.writeFileSync(
          path.join(paramsFolder, PARAMETER_DEFINITIONS[0].fileName),
          kinFileString
        );

        let initFileString =
          inputFileBuilder.buildInitialConfigParameterString();
        fs.writeFileSync(
          path.join(paramsFolder, PARAMETER_DEFINITIONS[1].fileName),
          initFileString
        );

        if (is_animation) {
          fs.writeFileSync(
            path.join(
              paramsFolder,
              "initial_configuration_parameters_movie.txt"
            ),
            initFileString
          );
        }

        let simFileString = inputFileBuilder.buildSimulationParameterString();
        fs.writeFileSync(
          path.join(paramsFolder, "simulation_parameters.txt"),
          simFileString
        );

        if (err) {
          logger.error("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }
      });

      form.once("end", async () => {
        //All Files will be written to disk so we can start running the code
        const [user, userCreated] = await db.users.findOrCreate({
          where: { email: email },
          defaults: { email: email, deletion_uuid: uuid.v4() },
        });

        const [run, runCreated] = await db.runs.findOrCreate({
          where: { uuid: runUuid },
          defaults: {
            created_by: email,
            start_uuid: uuid.v4(),
            uuid: runUuid,
            is_fitting: false,
            is_animation: is_animation,
          },
        });

        emailService.sendStartSimulationEmail(
          user.email,
          runUuid,
          run.start_uuid
        );
      });

      res.status(200).json({ uuid: runUuid });
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const runsEndpoint = new RunsEndpoint();

module.exports = runsEndpoint;
