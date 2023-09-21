const CONSTANTS = require("../config/constants.config");
const path = require("path");
const express = require("express");
const logger = require("./Logger");
const db = require("./db/Database");
const { runSimulation, runFitting } = require("./SimulationRunner");

//Endpoints
const runsEndpoint = require("./endpoints/RunsEndpoint");
const fittingEndpoint = require("./endpoints/FittingEndpoint");
const apiRunsEndpoint = require("./endpoints/ApiRunsEndpoint");
const apiRunEndpoint = require("./endpoints/ApiRunEndpoint");
const apiRunDataDownloadEndpoint = require("./endpoints/ApiRunDataDownloadEndpoint");
const apiRunParametersDownloadEndpoint = require("./endpoints/ApiRunParametersDownloadEndpoint");
const apiPlotsEndpoint = require("./endpoints/ApiPlotsEndpoint");
const reactEndpoint = require("./endpoints/ReactEndpoint");
const apiUserCreationEndpoint = require("./endpoints/ApiUserCreationEndpoint");
const apiUserDeletionEndpoint = require("./endpoints/ApiUserDeletionEndpoint");
const apiRunsStartEndpoint = require("./endpoints/ApiRunsStartEndpoint");
const apiRunParametersEndpoint = require("./endpoints/ApiRunParametersEndpoint");
const apiFittingPlotsEndpoint = require("./endpoints/ApiFittingPlotsEndpoint");
const apiFittingRunEndpoint = require("./endpoints/ApiFittingRunEndpoint");
const apiFittingParametersEndpoint = require("./endpoints/ApiFittingParametersEndpoint");
const apiFittingParametersToFitEndpoint = require("./endpoints/ApiFittingParametersToFitEndpoint");
const apiRunAnimationDownloadEndpoint = require("./endpoints/ApiRunAnimationDownloadEndpoint");
const apiSampleFileExperimentalEndpoint = require("./endpoints/ApiSampleFileExperimentalEndpoint");
const apiFittingRSquaredEndpoint = require("./endpoints/ApiFittingRSquaredEndpoint");

db.init();

const app = express();
const PORT = 8080;

global.fittingQueue = [];
global.simulationQueue = [];

global.activeSimulationRuns = 0;
global.activeFittingRuns = 0;

const initFittingQueue = async () => {
  await db.sequelize.sync({ force: false });
  logger.info("Searching for not finished fitting runs...");
  const runsToStart = await db.runs.findAll({
    where: { is_fitting: true, finished_at: null },
  });
  logger.info(runsToStart);
  if (runsToStart == null) {
    logger.info("No unfinished fitting runs added to queue...");
    return;
  }
  logger.info(
    "Adding " + runsToStart.length + " not finished fitting runs to queue..."
  );
  runsToStart.forEach((run) => {
    fittingQueue.push(() => runFitting(run.uuid, run.created_by));
  });
};

initFittingQueue();

setInterval(() => {
  /*
    logger.info("Trying to start a new process...");

    logger.info("Number of active simulation runs: " + activeSimulationRuns);
    logger.info("Number of active fitting runs: " + activeFittingRuns);
    logger.info("Number of simulation processes in queue: " + simulationQueue.length);
    logger.info("Number of fitting processes in queue: " + fittingQueue.length);
    */
  try {
    if (
      simulationQueue.length > 0 &&
      activeSimulationRuns < CONSTANTS.MAX_SIMULATION_RUNS
    ) {
      logger.info("Starting a new simulation process...");
      global.activeSimulationRuns++;
      const nextProcess = simulationQueue.shift();
      nextProcess();
    }
    if (
      fittingQueue.length > 0 &&
      activeFittingRuns < CONSTANTS.MAX_FITTING_RUNS
    ) {
      logger.info("Starting a new fitting process...");
      global.activeFittingRuns++;
      const nextProcess = fittingQueue.shift();
      nextProcess();
    }
  } catch (error) {
    logger.error(error);
  }
}, 1000);

app.use(
  express.static(path.join(__dirname, "..", "..", CONSTANTS.BUILD_FOLDER))
);

app.post(runsEndpoint.path, runsEndpoint.callback);

app.post(fittingEndpoint.path, fittingEndpoint.callback);

app.get(
  apiRunParametersDownloadEndpoint.path,
  apiRunParametersDownloadEndpoint.callback
);

app.get(apiRunsEndpoint.path, apiRunsEndpoint.callback);

app.get(apiRunEndpoint.path, apiRunEndpoint.callback);

app.get(apiRunDataDownloadEndpoint.path, apiRunDataDownloadEndpoint.callback);

app.get(apiPlotsEndpoint.path, apiPlotsEndpoint.callback);

app.get(apiUserCreationEndpoint.path, apiUserCreationEndpoint.callback);

app.get(apiUserDeletionEndpoint.path, apiUserDeletionEndpoint.callback);

app.get(apiRunsStartEndpoint.path, apiRunsStartEndpoint.callback);

app.get(apiRunParametersEndpoint.path, apiRunParametersEndpoint.callback);

app.get(apiFittingPlotsEndpoint.path, apiFittingPlotsEndpoint.callback);

app.get(apiFittingRunEndpoint.path, apiFittingRunEndpoint.callback);

app.get(apiFittingRSquaredEndpoint.path, apiFittingRSquaredEndpoint.callback);

app.get(
  apiSampleFileExperimentalEndpoint.path,
  apiSampleFileExperimentalEndpoint.callback
);

app.get(
  apiRunAnimationDownloadEndpoint.path,
  apiRunAnimationDownloadEndpoint.callback
);

app.get(
  apiFittingParametersEndpoint.path,
  apiFittingParametersEndpoint.callback
);

app.get(
  apiFittingParametersToFitEndpoint.path,
  apiFittingParametersToFitEndpoint.callback
);

app.get(reactEndpoint.path, reactEndpoint.callback); //must be last because its the most general endpoint -> path: '*'

app.listen(PORT, () => logger.info("Server is running on port " + PORT));
