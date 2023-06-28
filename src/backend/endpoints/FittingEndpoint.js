const uuid = require("uuid");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const logger = require("../Logger.js");
const InputFileBuilder = require("../InputFileBuilder.js");
const PARAMETER_DEFINITIONS = require("../../config/param.config");
const createDirectoryStructure = require("../DirectoryHelper");
const emailService = require("../EmailService");
const CONSTANTS = require("../../config/constants.config");
const db = require("../db/Database");
const { createDirectoryStructureFitting } = require("../DirectoryHelper");

class FittingEndpoint {
  constructor() {
    this.path = "/fitting";
  }

  async callback(req, res) {
    try {
      const runUuid = uuid.v4();
      logger.info(runUuid);

      const form = new formidable.IncomingForm();

      const dataFolder = path.join(
        __dirname,
        "..",
        "..",
        "..",
        CONSTANTS.DATA_FOLDER
      );
      const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, runUuid);
      const latestFolder = path.join(runFolder, "latest");
      const paramsFolder = path.join(latestFolder, CONSTANTS.PARAMS_FOLDER);
      const expeFolder = path.join(
        latestFolder,
        CONSTANTS.OUTPUT_FOLDER,
        "expe_data"
      );

      createDirectoryStructureFitting(runUuid);

      let email = "";

      form.parse(req, async (err, fields, files) => {
        logger.info(fields);
        let inputFileBuilder = new InputFileBuilder(fields);
        email = fields.email;

        let sampleNames = inputFileBuilder.buildExperimentalSampleNamesString();

        fs.writeFileSync(path.join(runFolder, "sample_names.txt"), sampleNames);

        let kinRandomString =
          inputFileBuilder.buildKinematicParametersToRandomizeString();
        fs.writeFileSync(
          path.join(runFolder, "kin_params_to_randomize.txt"),
          kinRandomString
        );

        let initRandomString =
          inputFileBuilder.buildInitialParametersToRandomizeString();
        fs.writeFileSync(
          path.join(runFolder, "init_params_to_randomize.txt"),
          initRandomString
        );

        let kinFileString = inputFileBuilder.buildKinematicParameterString();
        fs.writeFileSync(
          path.join(paramsFolder, PARAMETER_DEFINITIONS[0].fileName),
          kinFileString
        );
        fs.writeFileSync(
          path.join(runFolder, "best_candidate_specs.txt"),
          kinFileString
        ); //starting point for fitting

        fs.writeFileSync(
          path.join(runFolder, "best_kin_specs.txt"),
          kinFileString
        ); //starting point for fitting
        fs.writeFileSync(
          path.join(runFolder, "start_kin_specs.txt"),
          kinFileString
        );

        let simFileString = inputFileBuilder.buildSimulationParameterString();
        fs.writeFileSync(
          path.join(paramsFolder, "simulation_parameters.txt"),
          simFileString
        );

        let experimental_data_1 = JSON.parse(fields.experimental_data_1);
        let experimental_data_2 = JSON.parse(fields.experimental_data_2);
        let experimental_data_3 = JSON.parse(fields.experimental_data_3);
        let experimental_data_4 = JSON.parse(fields.experimental_data_4);
        let experimental_data_5 = JSON.parse(fields.experimental_data_5);

        let experimental_data = [
          experimental_data_1,
          experimental_data_2,
          experimental_data_3,
          experimental_data_4,
          experimental_data_5,
        ];

        let nr_data_points = 0;
        for (let data of experimental_data) {
          if (data.glc.length > 0 || data.xyl.length > 0) {
            nr_data_points++;
            if (data.glc.length > 0) {
              let experimental_data_string_glc =
                inputFileBuilder.buildExperimentalDataString(data.glc);
              fs.writeFileSync(
                path.join(
                  expeFolder,
                  "expe_saccharification_data" + nr_data_points + "_glc.txt"
                ),
                experimental_data_string_glc
              );
            }
            if (data.xyl.length > 0) {
              let experimental_data_string_xyl =
                inputFileBuilder.buildExperimentalDataString(data.xyl);
              fs.writeFileSync(
                path.join(
                  expeFolder,
                  "expe_saccharification_data" + nr_data_points + "_xyl.txt"
                ),
                experimental_data_string_xyl
              );
            }
            let initial_config_string =
              inputFileBuilder.buildInitialConfigIndexedParameterString(
                nr_data_points
              );
            fs.writeFileSync(
              path.join(
                runFolder,
                "best_init_specs_data" + nr_data_points + ".txt"
              ),
              initial_config_string
            );
            fs.writeFileSync(
              path.join(
                runFolder,
                "start_init_specs_data" + nr_data_points + ".txt"
              ),
              initial_config_string
            );
          }
        }

        let keywordString = inputFileBuilder.buildKeywordString(nr_data_points);
        logger.info(keywordString);
        fs.writeFileSync(path.join(runFolder, "keywords.txt"), keywordString);
        fs.writeFileSync(path.join(runFolder, "vars.txt"), "");

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
            is_fitting: true,
            is_animation: false,
          },
        });

        emailService.sendStartFittingEmail(user.email, runUuid, run.start_uuid);
      });

      res.status(200).json({ uuid: runUuid });
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const fittingEndpoint = new FittingEndpoint();

module.exports = fittingEndpoint;
