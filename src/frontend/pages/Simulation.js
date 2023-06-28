import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import PARAMETER_DEFINITIONS from "../../config/param.config";
import AboutInitialConfigurationParametersCard from "../components/AboutCards/AboutInitialConfigurationParametersCard";
import AboutKineticParametersCard from "../components/AboutCards/AboutKineticParametersCard";
import AboutSimulation from "../components/AboutCards/AboutSimulationCard";
import ParameterFormCard from "../components/FormCards/ParameterFormCard";
import StartEmailFormCard from "../components/FormCards/StartEmailFormCard";

const Simulation = () => {
  let navigate = useNavigate();

  var initial = [];
  var validationDict = {}; //mapping name of parameter to validation funciton

  initial.push(
    ...PARAMETER_DEFINITIONS[0].parameters.map((param) => [
      param.name,
      param.defaultValue,
    ])
  );
  initial.push(
    ...PARAMETER_DEFINITIONS[1].parameters.map((param) => [
      param.name,
      param.defaultValue,
    ])
  );

  PARAMETER_DEFINITIONS[0].parameters.forEach(
    (parameterDefinition) =>
      (validationDict[parameterDefinition.name] =
        parameterDefinition.validationFunction)
  );
  PARAMETER_DEFINITIONS[1].parameters.forEach(
    (parameterDefinition) =>
      (validationDict[parameterDefinition.name] =
        parameterDefinition.validationFunction)
  );

  //add value for substrate param and validation function because its not part of PARAMETER_DEFINITIONS
  initial.push([
    PARAMETER_DEFINITIONS[1].substrate.name,
    PARAMETER_DEFINITIONS[1].substrate.defaultValue,
  ]);
  validationDict[PARAMETER_DEFINITIONS[1].substrate.name] =
    PARAMETER_DEFINITIONS[1].substrate.validationFunction;

  initial.push(["email", ""]);
  initial.push(["is_animation", false]);
  const initials = Object.fromEntries(initial);

  validationDict["email"] = (email) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return true;
    }
    return false;
  };

  validationDict["is_animation"] = () => {
    return true;
  };

  const submitForm = (values) => {
    const formData = new FormData();

    Object.entries(values).forEach((value) =>
      formData.append(value[0], value[1])
    );

    axios
      .post("runs", formData, {})
      .then((response) => {
        navigate("/simulation/request");
      })
      .catch((error) => {});
  };

  const formik = useFormik({
    initialValues: initials,
    onSubmit: submitForm,
    validate: (values) => {
      const errors = {};
      for (const [key, value] of Object.entries(values)) {
        if (key === "email") {
          if (!validationDict[key](value)) {
            errors[key] = true;
          }
        } else {
          if (isNaN(value) || String(value).length === 0) {
            errors[key] = true;
          } else {
            if (!validationDict[key](value)) {
              errors[key] = true;
            }
          }
        }
      }

      if (
        parseFloat(values["EG_PCT"]) +
          parseFloat(values["CBH_PCT"]) +
          parseFloat(values["BGL_PCT"]) +
          parseFloat(values["XYL_PCT"]) !==
        1.0
      ) {
        errors["EG_PCT"] = true;
        errors["CBH_PCT"] = true;
        errors["BGL_PCT"] = true;
        errors["XYL_PCT"] = true;
      }
      if (
        parseFloat(values["PER_C"]) +
          parseFloat(values["PER_H"]) +
          parseFloat(values["PER_L"]) !==
        1.0
      ) {
        errors["PER_C"] = true;
        errors["PER_H"] = true;
        errors["PER_L"] = true;
      }
      return errors;
    },
  });

  return (
    <>
      <AboutSimulation />

      <form onSubmit={formik.handleSubmit}>
        <AboutKineticParametersCard />
        <ParameterFormCard
          formik={formik}
          parameterDefinition={PARAMETER_DEFINITIONS[0]}
          isOpen={true}
        />
        <AboutInitialConfigurationParametersCard />
        <ParameterFormCard
          formik={formik}
          parameterDefinition={PARAMETER_DEFINITIONS[1]}
          isOpen={true}
        />
        <StartEmailFormCard
          formik={formik}
          button_text={"Start the Simulation"}
          is_simulation={true}
        />
      </form>
    </>
  );
};

export default Simulation;
