const path = require("path");
const fs = require("fs");
const db = require("../db/Database");
const PARAMETER_DEFINITIONS = require("./../../config/param.config.js");

const logger = require("../Logger.js");

class ApiRunParametersEndpoint {
  constructor() {
    this.path = "/api/simulation/runs/:id/parameters";
  }

  async callback(req, res) {
    try {
      logger.info(`Requesting parameters for UUID ${req.params.id}`);

      const run = await db.runs.findOne({ where: { uuid: req.params.id } });

      if (run === null) {
        res.sendStatus(404);
        return;
      }

      const paramsFolder = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "data",
        "runs",
        req.params.id,
        "Params"
      );

      const kineticParametersFile = path.join(
        paramsFolder,
        "kinetic_parameters.txt"
      );
      const initialConfigurationParametersFile = path.join(
        paramsFolder,
        "initial_configuration_parameters.txt"
      );

      const kineticData = fs.readFileSync(kineticParametersFile, "utf-8");
      const initialConfigurationParametersData = fs.readFileSync(
        initialConfigurationParametersFile,
        "utf-8"
      );

      const kineticList = kineticData.split("\t");
      const initialConfigurationList =
        initialConfigurationParametersData.split("\t");

      const kineticDefinitions = PARAMETER_DEFINITIONS[0].parameters;
      const initialConfigurationDefinitions =
        PARAMETER_DEFINITIONS[1].parameters;

      const kineticParametersList = kineticDefinitions.map((definition) => ({
        [definition.displayName]: kineticList[definition.index],
      }));

      let initialConfigurationParametersList =
        initialConfigurationDefinitions.map((definition) => ({
          [definition.displayName]: initialConfigurationList[definition.index],
        }));

      //Add mode code parameter in front of array
      initialConfigurationParametersList = [
        {
          [PARAMETER_DEFINITIONS[1].substrate.displayName]:
            initialConfigurationList[PARAMETER_DEFINITIONS[1].substrate.index],
        },
      ].concat(initialConfigurationParametersList);

      res.json({
        kinetic_parameters: kineticParametersList,
        initial_configuration_parameters: initialConfigurationParametersList,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const apiRunParametersEndpoint = new ApiRunParametersEndpoint();

module.exports = apiRunParametersEndpoint;
