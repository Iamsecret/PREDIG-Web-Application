const CONSTANTS = require("../config/constants.config");
const fs = require("fs");
const path = require("path");

function createDirectoryStructureFitting(run_uuid) {
  const dataFolder = path.join(__dirname, "..", "..", CONSTANTS.DATA_FOLDER);

  const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, run_uuid);
  const latestFolder = path.join(runFolder, "latest");
  const familyFolder = path.join(runFolder, "family_1");
  const simulationBinaryPath = path.join(
    dataFolder,
    CONSTANTS.SIMULATION_BINARY_NAME
  );
  const paramsFolder = path.join(latestFolder, CONSTANTS.PARAMS_FOLDER);
  const outputFolder = path.join(latestFolder, CONSTANTS.OUTPUT_FOLDER);
  const expeFolder = path.join(outputFolder, "expe_data");
  const figFolder = path.join(latestFolder, CONSTANTS.FIGURES_FOLDER);
  const readmePath = path.join(dataFolder, "predig-src", "README.md");

  //create the needed dir structure
  fs.mkdirSync(runFolder);
  fs.mkdirSync(latestFolder);
  fs.mkdirSync(familyFolder);
  fs.mkdirSync(paramsFolder);

  fs.mkdirSync(outputFolder);
  fs.mkdirSync(figFolder);
  fs.mkdirSync(expeFolder);
  fs.copyFileSync(
    simulationBinaryPath,
    path.join(runFolder, CONSTANTS.SIMULATION_BINARY_NAME)
  );
  fs.copyFileSync(readmePath, path.join(latestFolder, "README.md"));

  //copy all files needed for fitting into the runFolder
  const fittingFiles = fs.readdirSync(
    path.join(dataFolder, "predig-src", "Fitting"),
    { withFileTypes: true }
  );

  fittingFiles.forEach((dirent) =>
    fs.copyFileSync(
      path.join(dataFolder, "predig-src", "Fitting", dirent.name),
      path.join(runFolder, dirent.name)
    )
  );

  //copy standard files every run needs
  const stdFiles = fs.readdirSync(path.join(dataFolder, "standard_files"), {
    withFileTypes: true,
  });

  stdFiles.forEach((dirent) =>
    fs.copyFileSync(
      path.join(dataFolder, "standard_files", dirent.name),
      path.join(paramsFolder, dirent.name)
    )
  );

  //create the needed dir structure
  CONSTANTS.OUTPUT_SUBFOLDERS.forEach((folderName) => {
    fs.mkdirSync(path.join(outputFolder, folderName));
  });
}

function createDirectoryStructure(runUuid) {
  const dataFolder = path.join(__dirname, "..", "..", CONSTANTS.DATA_FOLDER);

  const runFolder = path.join(dataFolder, CONSTANTS.RUN_FOLDER, runUuid);
  const simulationBinaryPath = path.join(
    dataFolder,
    CONSTANTS.SIMULATION_BINARY_NAME
  );
  const pltScriptPath = path.join(dataFolder, CONSTANTS.PLOTTING_SCRIPTS_NAME);
  const readmePath = path.join(dataFolder, "predig-src", "README.md");

  const movieScriptsPath = path.join(
    dataFolder,
    "predig-src",
    "scripts_for_movie"
  );

  const frameJoinerScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.FRAME_JOINER_SCRIPT_NAME
  );
  const frameMaker1ScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.FRAME_MAKER_1_SCRIPT_NAME
  );
  const frameMaker2ScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.FRAME_MAKER_2_SCRIPT_NAME
  );
  const frameTimeScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.FRAME_TIME_SCRIPT_NAME
  );

  const frameCopierScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.FRAME_COPIER_SCRIPT_NAME
  );

  const movieMakerScriptPath = path.join(
    movieScriptsPath,
    CONSTANTS.MOVIEMAKER_SCRIPT_NAME
  );

  const paramsFolder = path.join(runFolder, CONSTANTS.PARAMS_FOLDER);
  const outputFolder = path.join(runFolder, CONSTANTS.OUTPUT_FOLDER);
  const figFolder = path.join(runFolder, CONSTANTS.FIGURES_FOLDER);

  //create the needed dir structure
  fs.mkdirSync(runFolder);
  fs.mkdirSync(paramsFolder);
  fs.mkdirSync(figFolder);
  fs.mkdirSync(outputFolder);
  fs.copyFileSync(
    simulationBinaryPath,
    path.join(runFolder, CONSTANTS.SIMULATION_BINARY_NAME)
  );
  fs.copyFileSync(
    pltScriptPath,
    path.join(runFolder, CONSTANTS.PLOTTING_SCRIPTS_NAME)
  );
  fs.copyFileSync(readmePath, path.join(runFolder, "README.md"));

  let scriptsForMovieDestFolder = path.join(runFolder, "scripts_for_movie");
  fs.mkdirSync(scriptsForMovieDestFolder);

  fs.copyFileSync(
    frameJoinerScriptPath,
    path.join(scriptsForMovieDestFolder, CONSTANTS.FRAME_JOINER_SCRIPT_NAME)
  );
  fs.copyFileSync(
    frameMaker1ScriptPath,
    path.join(scriptsForMovieDestFolder, CONSTANTS.FRAME_MAKER_1_SCRIPT_NAME)
  );
  fs.copyFileSync(
    frameMaker2ScriptPath,
    path.join(scriptsForMovieDestFolder, CONSTANTS.FRAME_MAKER_2_SCRIPT_NAME)
  );
  fs.copyFileSync(
    frameTimeScriptPath,
    path.join(scriptsForMovieDestFolder, CONSTANTS.FRAME_TIME_SCRIPT_NAME)
  );
  fs.copyFileSync(
    frameCopierScriptPath,
    path.join(scriptsForMovieDestFolder, CONSTANTS.FRAME_COPIER_SCRIPT_NAME)
  );
  fs.copyFileSync(
    movieMakerScriptPath,
    path.join(runFolder, CONSTANTS.MOVIEMAKER_SCRIPT_NAME)
  );

  //copy standard files every run needs
  const stdFiles = fs.readdirSync(path.join(dataFolder, "standard_files"), {
    withFileTypes: true,
  });

  stdFiles.forEach((dirent) =>
    fs.copyFileSync(
      path.join(dataFolder, "standard_files", dirent.name),
      path.join(paramsFolder, dirent.name)
    )
  );

  //create the needed dir structure
  CONSTANTS.OUTPUT_SUBFOLDERS.forEach((folderName) => {
    fs.mkdirSync(path.join(outputFolder, folderName));
  });
}

module.exports = { createDirectoryStructure, createDirectoryStructureFitting };
