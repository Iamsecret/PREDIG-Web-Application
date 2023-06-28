const path = require("path");
const fs = require("fs");
const db = require("../db/Database");
const PARAMETER_DEFINITIONS = require("../../config/param.config.js");

const logger = require("../Logger.js");

class ApiFittingParametersEndpoint {
  constructor() {
    this.path = "/api/fitting/runs/:id/parameters";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters for UUID ${req.params.id}`);

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

      const startKineticParametersFile = path.join(
        runFolder,
        "start_kin_specs.txt"
      );
      const bestKineticParametersFile = path.join(
        runFolder,
        "BEST_FIT",
        "best_Run",
        "Params",
        "kinetic_parameters.txt"
      );

      const bestInitParamList = [];
      const startInitParamList = [];
      const initialConfigurationDefinitions =
        PARAMETER_DEFINITIONS[1].parameters;
      for (let i = 0; i < 5; i++) {
        const bestInitParametersFile = path.join(
          runFolder,
          "BEST_FIT",
          "best_Run",
          "Params",
          "initial_configuration_parameters_data" + (i + 1) + ".txt"
        );
        const startInitParametersFile = path.join(
          runFolder,
          "start_init_specs_data" + (i + 1) + ".txt"
        );

        if (fs.existsSync(bestInitParametersFile)) {
          const bestInitData = fs.readFileSync(bestInitParametersFile, "utf-8");
          const startInitData = fs.readFileSync(
            startInitParametersFile,
            "utf-8"
          );

          const bestInitList = bestInitData.split("\t");
          const startInitList = startInitData.split("\t");

          let bestInitParametersList = initialConfigurationDefinitions.map(
            (definition) => ({
              [definition.displayName]: bestInitList[definition.index],
            })
          );
          let startInitParametersList = initialConfigurationDefinitions.map(
            (definition) => ({
              [definition.displayName]: startInitList[definition.index],
            })
          );
          //Add mode code parameter in front of array
          startInitParametersList = [
            {
              [PARAMETER_DEFINITIONS[1].substrate.displayName]:
                startInitList[PARAMETER_DEFINITIONS[1].substrate.index],
            },
          ].concat(startInitParametersList);
          bestInitParametersList = [
            {
              [PARAMETER_DEFINITIONS[1].substrate.displayName]:
                bestInitList[PARAMETER_DEFINITIONS[1].substrate.index],
            },
          ].concat(bestInitParametersList);

          bestInitParamList.push(bestInitParametersList);
          startInitParamList.push(startInitParametersList);
        }
      }

      const startKineticData = fs.readFileSync(
        startKineticParametersFile,
        "utf-8"
      );
      const bestKineticData = fs.readFileSync(
        bestKineticParametersFile,
        "utf-8"
      );

      const startKineticList = startKineticData.split("\t");
      const bestKineticList = bestKineticData.split("\t");

      const kineticDefinitions = PARAMETER_DEFINITIONS[0].parameters;

      const startKineticParametersList = kineticDefinitions.map(
        (definition) => ({
          [definition.displayName]: startKineticList[definition.index],
        })
      );

      const bestKineticParametersList = kineticDefinitions.map(
        (definition) => ({
          [definition.displayName]: bestKineticList[definition.index],
        })
      );

      res.json({
        startKineticParameters: startKineticParametersList,
        bestKineticParameters: bestKineticParametersList,
        startInitialParametersList: startInitParamList,
        bestInitialParametersList: bestInitParamList,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiFittingParametersEndpoint = new ApiFittingParametersEndpoint();

module.exports = apiFittingParametersEndpoint;
