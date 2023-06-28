import PARAMETER_DEFINITIONS from "../../config/param.config";
import ExperimentalDataUploadCard from "./FormCards/ExperimentalDataUploadFormCard";
import ParameterFormCard from "./FormCards/ParameterFormCard";

const ExperimentComponent = ({ formik, is_use_param, dataset_nr, setData }) => {
  let parameterDefinition = { ...PARAMETER_DEFINITIONS[1] }; //copy
  parameterDefinition.parameters = PARAMETER_DEFINITIONS[1].parameters.map(
    (value) => ({ ...value, name: value.name + "_" + dataset_nr })
  );
  parameterDefinition.substrate = {
    ...parameterDefinition.substrate,
    name: parameterDefinition.substrate.name + "_" + dataset_nr,
  };

  return (
    <>
      <ExperimentalDataUploadCard
        dataset_nr={dataset_nr}
        formik={formik}
        setData={setData}
      />
      {is_use_param ? (
        <ParameterFormCard
          formik={formik}
          parameterDefinition={parameterDefinition}
          isOpen={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ExperimentComponent;
