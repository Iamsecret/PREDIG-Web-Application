import { Divider } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { default as React, useState } from "react";
import { useNavigate } from "react-router-dom";
import PARAMETER_DEFINITIONS from "../../config/param.config";
import AboutFileUploadCard from "../components/AboutCards/AboutFileUploadCard";
import AboutFittingCard from "../components/AboutCards/AboutFittingCard";
import AboutInitialConfigurationParametersCard from "../components/AboutCards/AboutInitialConfigurationParametersCard";
import AboutKineticParametersCard from "../components/AboutCards/AboutKineticParametersCard";
import AboutParametersToFitCard from "../components/AboutCards/AboutParametersToFitCard";
import ExperimentalDataCard from "../components/DataCards/ExperimentalDataCard";
import ExperimentComponent from "../components/ExperimentComponent";
import ParameterFormCard from "../components/FormCards/ParameterFormCard";
import ParametersToFitCard from "../components/FormCards/ParametersToFitCard";
import StartEmailFormCard from "../components/FormCards/StartEmailFormCard";

const Fitting = () => {
  let navigate = useNavigate();
  const [experimentCount, setExperimentCount] = useState(1);
  const [isOneInitialParameterSet, setIsOneInitialParameterSet] =
    useState(false);
  const [experimentalData1, setExperimentalData1] = useState({
    glc: [],
    xyl: [],
  });
  const [experimentalData2, setExperimentalData2] = useState({
    glc: [],
    xyl: [],
  });
  const [experimentalData3, setExperimentalData3] = useState({
    glc: [],
    xyl: [],
  });
  const [experimentalData4, setExperimentalData4] = useState({
    glc: [],
    xyl: [],
  });
  const [experimentalData5, setExperimentalData5] = useState({
    glc: [],
    xyl: [],
  });

  var initial = [];
  var validationDict = {}; //mapping name of parameter to validation funciton

  initial.push(
    ...PARAMETER_DEFINITIONS[0].parameters.map((param) => [
      param.name,
      param.defaultValue,
    ])
  );
  PARAMETER_DEFINITIONS[0].parameters.forEach(
    (parameterDefinition) =>
      (validationDict[parameterDefinition.name] =
        parameterDefinition.validationFunction)
  );

  for (let i = 0; i < 5; i++) {
    const index_string = "_" + (i + 1);
    initial.push(
      ...PARAMETER_DEFINITIONS[1].parameters.map((param) => [
        param.name + index_string,
        param.defaultValue,
      ])
    );
    PARAMETER_DEFINITIONS[1].parameters.forEach(
      (parameterDefinition) =>
        (validationDict[parameterDefinition.name + index_string] =
          parameterDefinition.validationFunction)
    );
  }
  initial.push(
    ...PARAMETER_DEFINITIONS[1].parameters.map((param) => [
      param.name,
      param.defaultValue,
    ])
  );
  PARAMETER_DEFINITIONS[1].parameters.forEach(
    (parameterDefinition) =>
      (validationDict[parameterDefinition.name] =
        parameterDefinition.validationFunction)
  );

  PARAMETER_DEFINITIONS.forEach((definition) =>
    initial.push(
      ...definition.parameters.map((param) => ["is_used_" + param.name, false])
    )
  );

  //add value for substrate param and validation function because its not part of PARAMETER_DEFINITIONS
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name,
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name + "_1",
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name + "_2",
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name + "_3",
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name + "_4",
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name + "_5",
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);

  initial.push(["exp_sample_name_1", "Experimental Sample #1"]);
  initial.push(["exp_sample_name_2", "Experimental Sample #2"]);
  initial.push(["exp_sample_name_3", "Experimental Sample #3"]);
  initial.push(["exp_sample_name_4", "Experimental Sample #4"]);
  initial.push(["exp_sample_name_5", "Experimental Sample #5"]);

  validationDict["exp_sample_name_1"] = () => false;
  validationDict["exp_sample_name_2"] = () => false;
  validationDict["exp_sample_name_3"] = () => false;
  validationDict["exp_sample_name_4"] = () => false;
  validationDict["exp_sample_name_5"] = () => false;

  validationDict[PARAMETER_DEFINITIONS[1].substrate.name] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name + "_1"] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name + "_2"] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name + "_3"] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name + "_4"] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name + "_5"] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;

  initial.push(["email", ""]);
  const initials = Object.fromEntries(initial);

  validationDict["email"] = (email) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return true;
    }
    return false;
  };

  const submitForm = (values) => {
    const formData = new FormData();

    if (isOneInitialParameterSet) {
      Object.entries(values).forEach((value) =>
        formData.append(value[0], value[1])
      );
      for (var i = 0; i < PARAMETER_DEFINITIONS[1].parameters.length; i++) {
        formData.set(
          PARAMETER_DEFINITIONS[1].parameters[i].name + "_1",
          values[PARAMETER_DEFINITIONS[1].parameters[i].name]
        );
        formData.set(
          PARAMETER_DEFINITIONS[1].parameters[i].name + "_2",
          values[PARAMETER_DEFINITIONS[1].parameters[i].name]
        );
        formData.set(
          PARAMETER_DEFINITIONS[1].parameters[i].name + "_3",
          values[PARAMETER_DEFINITIONS[1].parameters[i].name]
        );
        formData.set(
          PARAMETER_DEFINITIONS[1].parameters[i].name + "_4",
          values[PARAMETER_DEFINITIONS[1].parameters[i].name]
        );
        formData.set(
          PARAMETER_DEFINITIONS[1].parameters[i].name + "_5",
          values[PARAMETER_DEFINITIONS[1].parameters[i].name]
        );
      }
    } else {
      Object.entries(values).forEach((value) =>
        formData.append(value[0], value[1])
      );
    }

    formData.append("experimental_data_1", JSON.stringify(experimentalData1));
    formData.append("experimental_data_2", JSON.stringify(experimentalData2));
    formData.append("experimental_data_3", JSON.stringify(experimentalData3));
    formData.append("experimental_data_4", JSON.stringify(experimentalData4));
    formData.append("experimental_data_5", JSON.stringify(experimentalData5));

    axios
      .post("fitting", formData, {})
      .then((response) => {
        navigate("/fitting/request");
      })
      .catch((error) => {});
  };

  const formik = useFormik({
    initialValues: initials,
    onSubmit: submitForm,
    validate: (values) => {
      let errors = {};
      for (const [key, value] of Object.entries(values)) {
        if (key.startsWith("is_used_")) {
          if (typeof value != "boolean") {
            errors[key] = true;
          }
          continue;
        }
        if (key === "email") {
          if (!validationDict[key](value)) {
            errors[key] = true;
          }
        } else {
          if (key.startsWith("exp_sample")) {
            if (String(value).length > 0 && String(value).length <= 30) {
              continue;
            } else {
              errors[key] = true;
            }
          }
          if (isNaN(value) || String(value).length === 0) {
            errors[key] = true;
          } else {
            if (!validationDict[key](value)) {
              errors[key] = true;
            }
          }
        }
      }

      let percentagesValidation = (values, errors, index) => {
        if (
          parseFloat(values["EG_PCT" + index]) +
            parseFloat(values["CBH_PCT" + index]) +
            parseFloat(values["BGL_PCT" + index]) +
            parseFloat(values["XYL_PCT" + index]) !==
          1.0
        ) {
          errors["EG_PCT" + index] = true;
          errors["CBH_PCT" + index] = true;
          errors["BGL_PCT" + index] = true;
          errors["XYL_PCT" + index] = true;
        }
        if (
          parseFloat(values["PER_C" + index]) +
            parseFloat(values["PER_H" + index]) +
            parseFloat(values["PER_L" + index]) !==
          1.0
        ) {
          errors["PER_C" + index] = true;
          errors["PER_H" + index] = true;
          errors["PER_L" + index] = true;
        }
        return errors;
      };

      let crystallineValidation = (values, errors, index) => {
        if (
          parseFloat(values["PER_C_H" + index]) >
          parseFloat(values["PER_C_C" + index])
        ) {
          errors["PER_C_H" + index] = true;
          errors["PER_C_C" + index] = true;
        }
        return errors;
      };

      errors = percentagesValidation(values, errors, "");
      errors = percentagesValidation(values, errors, "_1");
      errors = percentagesValidation(values, errors, "_2");
      errors = percentagesValidation(values, errors, "_3");
      errors = percentagesValidation(values, errors, "_4");
      errors = percentagesValidation(values, errors, "_5");

      errors = crystallineValidation(values, errors, "");
      errors = crystallineValidation(values, errors, "_1");
      errors = crystallineValidation(values, errors, "_2");
      errors = crystallineValidation(values, errors, "_3");
      errors = crystallineValidation(values, errors, "_4");
      errors = crystallineValidation(values, errors, "_5");

      return errors;
    },
  });

  const experimentComponents = [
    <ExperimentComponent
      key={0}
      is_use_param={!isOneInitialParameterSet}
      formik={formik}
      dataset_nr={1}
      setData={setExperimentalData1}
    />,
    <ExperimentComponent
      key={1}
      is_use_param={!isOneInitialParameterSet}
      formik={formik}
      dataset_nr={2}
      setData={setExperimentalData2}
    />,
    <ExperimentComponent
      key={2}
      is_use_param={!isOneInitialParameterSet}
      formik={formik}
      dataset_nr={3}
      setData={setExperimentalData3}
    />,
    <ExperimentComponent
      key={3}
      is_use_param={!isOneInitialParameterSet}
      formik={formik}
      dataset_nr={4}
      setData={setExperimentalData4}
    />,
    <ExperimentComponent
      key={4}
      is_use_param={!isOneInitialParameterSet}
      formik={formik}
      dataset_nr={5}
      setData={setExperimentalData5}
    />,
  ];

  const addExperimentComponent = () => {
    if (experimentCount < 5) {
      setExperimentCount(experimentCount + 1);
    }
  };

  const removeExperimentComponent = () => {
    if (experimentCount > 1) {
      setExperimentCount(experimentCount - 1);
    }
  };

  return (
    <>
      <AboutFittingCard />

      <form onSubmit={formik.handleSubmit}>
        <AboutParametersToFitCard />
        <ParametersToFitCard formik={formik} />
        <AboutKineticParametersCard />
        {
          <ParameterFormCard
            formik={formik}
            parameterDefinition={{
              ...PARAMETER_DEFINITIONS[0],
              displayName: "Kinetic Parameters - common to all samples",
            }}
            isOpen={true}
          />
        }

        <ExperimentalDataCard
          addExperimentComponent={addExperimentComponent}
          removeExperimentComponent={removeExperimentComponent}
          experimentCount={experimentCount}
          setIsOneInitialParameterSet={setIsOneInitialParameterSet}
          isOneInitialParameterSet={isOneInitialParameterSet}
        />
        <AboutFileUploadCard />
        <AboutInitialConfigurationParametersCard />

        <Divider />
        {experimentComponents
          .slice(0, experimentCount)
          .map((component, index) => {
            return (
              <>
                {component}
                <Divider />
              </>
            );
          })}

        {isOneInitialParameterSet ? (
          <ParameterFormCard
            formik={formik}
            parameterDefinition={{
              ...PARAMETER_DEFINITIONS[1],
              displayName:
                "Inital configuration parameters - specific to each samples",
            }}
            isOpen={true}
          />
        ) : (
          <></>
        )}
        <StartEmailFormCard formik={formik} button_text={"Start the Fitting"} />
      </form>
    </>
  );
};
export default Fitting;
