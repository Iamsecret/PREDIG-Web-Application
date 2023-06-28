const PARAMETER_DEFINITIONS = require("../config/param.config");

class InputFileBuilder {
  constructor(values) {
    this.values = values;
  }

  buildKinematicParameterString() {
    const kineticParamList = PARAMETER_DEFINITIONS[0].parameters;

    const kinematicArray = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "2.5",
    ];

    kineticParamList.forEach((param, i) => {
      kinematicArray[param.index] = this.values[param.name];
    });

    return kinematicArray.join("\t");
  }

  buildInitialConfigParameterString() {
    const initialConfigParamList = PARAMETER_DEFINITIONS[1].parameters;

    const initialArray = [
      "",
      "",
      "",
      "",
      "",
      "50",
      "200",
      "1",
      "1",
      "",
      "",
      "",
      "0",
      "",
      "",
      "",
      "",
      "0.6",
    ];

    initialArray[PARAMETER_DEFINITIONS[1].substrate.index] =
      this.values[PARAMETER_DEFINITIONS[1].substrate.name];

    initialConfigParamList.forEach((param, i) => {
      initialArray[param.index] = this.values[param.name];
    });

    return initialArray.join("\t");
  }

  buildInitialConfigIndexedParameterString(index) {
    const initialConfigParamList = PARAMETER_DEFINITIONS[1].parameters;

    const index_string = "_" + index;

    const initialArray = [
      "",
      "",
      "",
      "",
      "",
      "50",
      "200",
      "1",
      "1",
      "",
      "",
      "",
      "0",
      "",
      "",
      "",
      "",
      "0.6",
    ];

    initialArray[PARAMETER_DEFINITIONS[1].substrate.index] =
      this.values[PARAMETER_DEFINITIONS[1].substrate.name + index_string];

    initialConfigParamList.forEach((param, i) => {
      initialArray[param.index] = this.values[param.name + index_string];
    });

    return initialArray.join("\t");
  }

  buildSimulationParameterString() {
    const simulationArray = [
      "200000",
      "200000",
      "400000",
      "100000",
      "25",
      "4",
      "2",
      "2",
      "1",
      "1",
      "1",
      "1",
      "0.5",
      "0.2",
    ];

    return simulationArray.join("\t");
  }

  buildKinematicParametersToRandomizeString() {
    const kineticParamList = PARAMETER_DEFINITIONS[0].parameters;

    const kinematicArray = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "0",
    ];

    kineticParamList.forEach((param, i) => {
      if (param.isUsedForFitting) {
        kinematicArray[param.index] =
          this.values["is_used_" + param.name] === "true" ? "1" : "0";
      } else {
        kinematicArray[param.index] = "0";
      }
    });

    return kinematicArray.join("\t");
  }

  buildInitialParametersToRandomizeString() {
    const initialConfigParamList = PARAMETER_DEFINITIONS[1].parameters;

    const initialArray = [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "",
      "",
      "",
      "",
      "0",
    ];

    initialConfigParamList.forEach((param, i) => {
      if (param.isUsedForFitting) {
        initialArray[param.index] =
          this.values["is_used_" + param.name] === "true" ? "1" : "0";
      } else {
        initialArray[param.index] = "0";
      }
    });

    return initialArray.join("\t");
  }

  buildExperimentalDataString(experimentalData) {
    let experimentalDataString = "";
    for (var i = 0; i < experimentalData.length; i++) {
      experimentalDataString +=
        experimentalData[i][0] + "\t" + experimentalData[i][1] + "\n";
    }
    return experimentalDataString;
  }

  buildKeywordString(nr_datasets) {
    let keywordString = "";
    for (var i = 0; i < nr_datasets; i++) {
      keywordString += "data" + (i + 1) + "\n";
    }
    return keywordString;
  }

  buildExperimentalSampleNamesString() {
    return (
      this.values["exp_sample_name_1"] +
      "\n" +
      this.values["exp_sample_name_2"] +
      "\n" +
      this.values["exp_sample_name_3"] +
      "\n" +
      this.values["exp_sample_name_4"] +
      "\n" +
      this.values["exp_sample_name_5"] +
      "\n"
    );
  }
}

module.exports = InputFileBuilder;
