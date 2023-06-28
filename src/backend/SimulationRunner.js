const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");
require("./index.js");
const logger = require("./Logger.js");
const emailService = require("./EmailService");
const CONSTANTS = require("../config/constants.config");

const db = require("./db/Database");

const runFitting = async (uuid, run_by_email) => {
  try {
    const dataFolder = path.join(__dirname, "..", "..", CONSTANTS.DATA_FOLDER);
    const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, uuid);
    const pltScriptPath = path.join(dataFolder, "plot_fitting.py");
    const bestRunPath = path.join(runFolder, "BEST_FIT", "best_Run");

    const run = await db.runs.findOne({ where: { uuid: uuid } });

    if (run.started_at == null) {
      logger.info("Start running fitting for uuid " + uuid);
      run.started_at = Date.now();
      await run.save();
    } else {
      logger.info("Resuming fitting for uuid " + uuid);
    }

    execFile(
      path.join(runFolder, "evo_wrapper.sh"),
      [],
      { cwd: runFolder },
      async (error, stdout, stderr) => {
        logger.info("Finished running fitting for uuid " + uuid);
        activeFittingRuns--;

        fs.writeFileSync(path.join(runFolder, "debug.log"), stdout);
        fs.writeFileSync(path.join(runFolder, "error.log"), stderr);
        if (error) {
          logger.error("Error while running fitting for " + uuid);
          throw error;
        }

        fs.copyFileSync(
          pltScriptPath,
          path.join(bestRunPath, "plot_fitting.py")
        );
        fs.mkdirSync(path.join(bestRunPath, "Figures"));
        //Run plotting scripts after finishing simulation
        execFile(
          "python3",
          ["plot_fitting.py"],
          { cwd: bestRunPath },
          (error, stdout, stderr) => {
            logger.info("Finished running plot.py for UUID " + uuid);
            fs.appendFileSync(path.join(runFolder, "debug.log"), stdout);
            fs.appendFileSync(path.join(runFolder, "error.log"), stderr);
            if (error) {
              logger.error("Error while running plot script" + uuid);
              throw error;
            }
          }
        );
        run.finished_at = Date.now();
        await run.save();

        emailService.sendFinishFittingEmail(run_by_email, uuid);
      }
    );
  } catch (error) {
    logger.error(error);
  }
};

const runSimulation = async (uuid, run_by_email, is_animation) => {
  try {
    logger.info("Start running simulation for uuid " + uuid);
    const dataFolder = path.join(__dirname, "..", "..", CONSTANTS.DATA_FOLDER);
    const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, uuid);

    const run = await db.runs.findOne({ where: { uuid: uuid } });

    run.started_at = Date.now();
    await run.save();

    execFile(
      path.join(runFolder, "code_4"),
      [],
      { cwd: runFolder },
      async (error, stdout, stderr) => {
        logger.info("Finished running code_4 for uuid " + uuid);
        activeSimulationRuns--;
        fs.writeFileSync(path.join(runFolder, "debug.log"), stdout);
        fs.writeFileSync(path.join(runFolder, "error.log"), stderr);
        if (error) {
          logger.error("Error while running simulation for " + uuid);
          throw error;
        }

        //Run plotting scripts after finishing simulation
        execFile(
          "python3",
          ["plot.py"],
          { cwd: runFolder },
          (error, stdout, stderr) => {
            logger.info("Finished running plot.py for UUID " + uuid);
            fs.appendFileSync(path.join(runFolder, "debug.log"), stdout);
            fs.appendFileSync(path.join(runFolder, "error.log"), stderr);
            if (error) {
              logger.error("Error while running plot script" + uuid);
              throw error;
            }
          }
        );

        if (is_animation) {
          execFile(
            path.join(runFolder, "Moviemaker.sh"),
            [],
            { cwd: runFolder },
            async (error, stdout, stderr) => {
              logger.info("Finished running Moviemaker.sh for UUID " + uuid);
              fs.appendFileSync(path.join(runFolder, "debug.log"), stdout);
              fs.appendFileSync(path.join(runFolder, "error.log"), stderr);
              if (error) {
                logger.error("Error while running Moviemaker.sh" + uuid);
                throw error;
              }
              run.finished_at = Date.now();
              await run.save();
              emailService.sendFinishSimulationEmail(run_by_email, uuid);
            }
          );
        } else {
          run.finished_at = Date.now();
          await run.save();
          emailService.sendFinishSimulationEmail(run_by_email, uuid);
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { runSimulation, runFitting };
