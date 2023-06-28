import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useRef, useState } from "react";

const ParameterFormCard = ({ parameterDefinition, formik, isOpen }) => {
  const paramFilename = parameterDefinition.fileName;
  const parameterDefinitions = parameterDefinition.parameters;

  const [radioValue0, setRadioValue0] = useState(4);
  const [radioValue1, setRadioValue1] = useState(4);
  const [radioValue2, setRadioValue2] = useState(4);
  const [radioValue3, setRadioValue3] = useState(4);

  const [isShowError, setIsShowError] = useState(false);
  const [disabledList, setDisabledList] = useState(
    Array(parameterDefinition.length).fill(false)
  );

  const isInitialParams =
    paramFilename === "initial_configuration_parameters.txt";

  const [open, setOpen] = useState(isOpen);
  const fileInputReference = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const onFileButtonClick = (event) => {
    fileInputReference.current.click();
  };

  const displayNameToNameMap = parameterDefinitions.reduce(
    (map, definition) => {
      map[definition.displayName] = definition.name;
      return map;
    },
    {}
  );
  //Add substrate parameter seperately because of different format
  if (isInitialParams) {
    displayNameToNameMap[parameterDefinition.substrate.displayName] =
      parameterDefinition.substrate.name;
  }

  const fileUploadEventHandler = (event) => {
    //parses the json file and maps the parameters based on their displayName
    const fileUploaded = event.target.files[0];

    if (fileUploaded.name.endsWith(".json")) {
      setIsShowError(false);
    } else {
      setIsShowError(true);
      return;
    }

    //parse the file as json
    let reader = new FileReader();

    reader.readAsText(fileUploaded);

    reader.onload = function (progressEvent) {
      //get the json object
      var json = JSON.parse(reader.result);

      //map the parameters based on their displayName
      for (var i = 0; i < json.length; i++) {
        let obj = json[i];
        for (var key in obj) {
          if (key in displayNameToNameMap) {
            formik.values[displayNameToNameMap[key]] = obj[key];
          }
        }
      }

      formik.validateForm();
    };
  };

  //Create filler elements for a nicer flex layout
  let nrPaddingGrids = 5 - (parameterDefinitions.length % 5);
  let paddingGrids = [];
  for (let i = 0; i < nrPaddingGrids; i++) {
    paddingGrids.push(
      <Grid item key={parameterDefinitions.length + i} xs={5}></Grid>
    );
  }

  const resetToDefaultValues = () => {
    //reset radio buttons
    setRadioValue0(4);
    setRadioValue1(4);
    setRadioValue2(4);
    setRadioValue3(4);
    setDisabledList(Array(parameterDefinition.length).fill(false));
    //reset all params
    parameterDefinitions.forEach(
      (definition) => (formik.values[definition.name] = definition.defaultValue)
    );
    formik.validateForm();
  };

  const customChange = (event) => {
    formik.handleChange(event);
  };

  const inputFieldsList = parameterDefinitions.map((definition, index) => (
    <Grid item key={index} xs={5}>
      <Tooltip title={definition.tooltip}>
        <TextField
          sx={{
            margin: "1em",
          }}
          required
          disabled={disabledList[index]}
          name={definition.name}
          id={definition.name}
          value={formik.values[definition.name]}
          onChange={customChange}
          error={Boolean(formik.errors[definition.name])}
          helperText={
            Boolean(formik.errors[definition.name]) ? definition.errorText : ""
          }
          InputLabelProps={{ shrink: true }}
          label={definition.displayName}
          variant="outlined"
        />
      </Tooltip>
    </Grid>
  ));

  //construct the subgroups for the parameter fields

  let concentrationInputFieldsList = [];
  let substrateCompositionInputFieldsList = [];
  let substrateStructureInputFieldsList = [];

  let kineticRatesInputFieldsList = [];
  let enzymeInhibitionInputFieldsList = [];
  let crystalinityInputFieldsList = [];
  let adhesionInputFieldsList = [];
  let cbhprocessiverateList = [];

  if (isInitialParams) {
    concentrationInputFieldsList = inputFieldsList.slice(0, 4);
    concentrationInputFieldsList.push(<Grid item key={37} xs={5}></Grid>);

    substrateCompositionInputFieldsList = inputFieldsList.slice(4, 7);

    substrateCompositionInputFieldsList.push(
      <Grid item key={37313477} xs={10}></Grid>
    );

    substrateStructureInputFieldsList = inputFieldsList.slice(7, 12);
    substrateStructureInputFieldsList.push(
      <Grid item key={373737} xs={5}></Grid>
    );
  } else {
    kineticRatesInputFieldsList = inputFieldsList.slice(0, 2);

    let eg_rates_dict = {
      1: [0.01, 0.125],
      2: [0.41, 0.95],
      3: [0.52, 0.33],
    };

    kineticRatesInputFieldsList.push(
      <Grid item xs={15} key={3731325737}>
        <FormControl sx={{ margin: "1.5em", float: "left", flexGrow: "1" }}>
          <RadioGroup
            row
            defaultValue={4}
            value={radioValue0}
            onChange={(e, v) => {
              setRadioValue0(v);
              if (v === "4") {
                disabledList[0] = false;
                disabledList[1] = false;
              } else {
                disabledList[0] = true;
                disabledList[1] = true;
                formik.values[parameterDefinitions[0].name] =
                  eg_rates_dict[e.currentTarget.value][0];
                formik.values[parameterDefinitions[1].name] =
                  eg_rates_dict[e.currentTarget.value][1];
              }
              formik.validateForm();
            }}
          >
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=737187">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=737187
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="1"
                control={<Radio />}
                label="Trichoderma reesei"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=681348">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=681348
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="2"
                control={<Radio />}
                label="Pyrococcus horikoshii"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=743720">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.4&r=743720
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="3"
                control={<Radio />}
                label="Rasamsonia emersonii"
              />
            </Tooltip>
            <FormControlLabel value="4" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
    );

    kineticRatesInputFieldsList.push(inputFieldsList.slice(2, 4));

    let bgl_rates_dict = {
      1: [51.6, 0.1],
      2: [284, 0.637],
      3: [93.7, 8.44],
    };

    kineticRatesInputFieldsList.push(
      <Grid item xs={15} key={3733467737}>
        <FormControl sx={{ margin: "1.5em", float: "left", flexGrow: "1" }}>
          <RadioGroup
            row
            defaultValue={4}
            value={radioValue1}
            onChange={(e, v) => {
              setRadioValue1(v);
              if (v === "4") {
                disabledList[2] = false;
                disabledList[3] = false;
              } else {
                disabledList[2] = true;
                disabledList[3] = true;
                formik.values[parameterDefinitions[2].name] =
                  bgl_rates_dict[e.currentTarget.value][0];
                formik.values[parameterDefinitions[3].name] =
                  bgl_rates_dict[e.currentTarget.value][1];
              }
              formik.validateForm();
            }}
          >
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=698851">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=698851
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="1"
                control={<Radio />}
                label="Carapichea ipecacuanha"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=741847">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=741847
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="2"
                control={<Radio />}
                label="Thermoascus aurantiacus"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=739692">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.21&r=739692
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="3"
                control={<Radio />}
                label="Humicola insolens"
              />
            </Tooltip>
            <FormControlLabel value="4" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
    );

    kineticRatesInputFieldsList.push(inputFieldsList.slice(4, 6));

    let xyl_rates_dict = {
      1: [68, 0.073],
      2: [898, 32.9],
      3: [833, 0.067],
    };

    kineticRatesInputFieldsList.push(
      <Grid item xs={15} key={3731346737}>
        <FormControl sx={{ margin: "1.5em", float: "left", flexGrow: "1" }}>
          <RadioGroup
            row
            defaultValue={4}
            value={radioValue2}
            onChange={(e, v) => {
              setRadioValue2(v);
              if (v === "4") {
                disabledList[4] = false;
                disabledList[5] = false;
              } else {
                disabledList[4] = true;
                disabledList[5] = true;
                formik.values[parameterDefinitions[4].name] =
                  xyl_rates_dict[e.currentTarget.value][0];
                formik.values[parameterDefinitions[5].name] =
                  xyl_rates_dict[e.currentTarget.value][1];
              }

              formik.validateForm();
            }}
          >
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=677533">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=677533
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="1"
                control={<Radio />}
                label="Trichoderma reesei"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=737633">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=737633
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="2"
                control={<Radio />}
                label="Rasamsonia emersonii"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=656559">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.8&r=656559
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="3"
                control={<Radio />}
                label="Thermoascus aurantiacus"
              />
            </Tooltip>
            <FormControlLabel value="4" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
    );

    kineticRatesInputFieldsList.push(inputFieldsList.slice(6, 8));

    let cbh_rates_dict = {
      1: [0.19, 0.04],
      2: [0.057, 0.0023],
      3: [8.9, 4.5],
    };

    kineticRatesInputFieldsList.push(
      <Grid item xs={15} key={373237452737}>
        <FormControl sx={{ margin: "1.5em", float: "left", flexGrow: "1" }}>
          <RadioGroup
            row
            defaultValue={4}
            value={radioValue3}
            onChange={(e, v) => {
              setRadioValue3(v);
              if (v === "4") {
                disabledList[6] = false;
                disabledList[7] = false;
              } else {
                disabledList[6] = true;
                disabledList[7] = true;

                formik.values[parameterDefinitions[6].name] =
                  cbh_rates_dict[e.currentTarget.value][0];
                formik.values[parameterDefinitions[7].name] =
                  cbh_rates_dict[e.currentTarget.value][1];
              }

              formik.validateForm();
            }}
          >
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=656530">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=656530
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="1"
                control={<Radio />}
                label="Trichoderma reesei"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=708476">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=708476
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="2"
                control={<Radio />}
                label="Thermobifida fusca"
              />
            </Tooltip>
            <Tooltip
              title={
                <React.Fragment>
                  <a href="https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=747160">
                    https://www.brenda-enzymes.org/literature.php?e=3.2.1.91&r=747160
                  </a>
                </React.Fragment>
              }
            >
              <FormControlLabel
                sx={{ fontStyle: "italic" }}
                value="3"
                control={<Radio />}
                label="Rasamsonia emersonii"
              />
            </Tooltip>
            <FormControlLabel value="4" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
    );

    cbhprocessiverateList = inputFieldsList.slice(8, 9);
    cbhprocessiverateList.push(<Grid item key={123} xs={20}></Grid>);

    enzymeInhibitionInputFieldsList = inputFieldsList.slice(10, 15);

    adhesionInputFieldsList = inputFieldsList.slice(9, 10);

    adhesionInputFieldsList.push(<Grid item key={123} xs={5}></Grid>);

    crystalinityInputFieldsList = inputFieldsList.slice(15, 17);

    crystalinityInputFieldsList.push(<Grid item key={12} xs={5}></Grid>);
  }

  let theme = useTheme();

  return (
    <>
      <Paper
        sx={{
          margin: "1em",
          border: "6px solid",
          borderColor: theme.palette.secondary.main,
        }}
        elevation={5}
      >
        <List>
          <ListItem>
            <input
              type="file"
              ref={fileInputReference}
              onInput={fileUploadEventHandler}
              onClick={(event) => (event.target.value = null)} //accept the same file multiple times
              style={{ display: "none" }}
            />
            <IconButton onClick={onFileButtonClick}>
              <UploadFileIcon color="primary" />
            </IconButton>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={parameterDefinition.displayName} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {isShowError ? (
            <Alert
              severity="error"
              onClose={() => {
                setIsShowError(false);
              }}
            >
              <strong>The file you provided had the wrong format</strong> — It
              must be a .json file.
            </Alert>
          ) : (
            <></>
          )}
          <Divider />
          <Collapse
            in={open}
            timeout="auto"
            sx={{ justifyContent: "space-around", alignItems: "flex-end" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1em",
              }}
            >
              <Button
                variant="contained"
                sx={{ marginRight: "1em" }}
                onClick={resetToDefaultValues}
              >
                Reset to Default Values
              </Button>
            </Box>
            <Grid
              container
              sx={{ justifyContent: "space-around" }}
              spacing={1}
              columns={25}
            >
              {isInitialParams ? (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    {" "}
                    Enzyme concentrations
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    Enzyme kinetic rates
                  </Typography>
                </Grid>
              )}
              {concentrationInputFieldsList}
              {kineticRatesInputFieldsList}
              {isInitialParams ? (
                <></>
              ) : (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    CBH processivity
                  </Typography>
                </Grid>
              )}
              {cbhprocessiverateList}
              {isInitialParams ? (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    Substrate molecular composition
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    Enzyme inhibition
                  </Typography>
                </Grid>
              )}
              {substrateCompositionInputFieldsList}
              {enzymeInhibitionInputFieldsList}
              {isInitialParams ? (
                <Grid item xs={25}>
                  <Typography sx={{ margin: "1em" }}>
                    Substrate structure
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={10}>
                    <Typography sx={{ margin: "1em" }}>
                      Enzyme adhesion to lignin
                    </Typography>
                  </Grid>
                  <Grid item xs={15}>
                    <Typography sx={{ margin: "1em" }}>
                      Substrate crystallinity
                    </Typography>
                  </Grid>
                </>
              )}
              {isInitialParams ? (
                <Grid item xs={25}>
                  <FormControl
                    sx={{ margin: "1em", float: "left", flexGrow: "1" }}
                  >
                    <RadioGroup
                      row
                      defaultValue={parameterDefinition.substrate.defaultValue}
                      name={parameterDefinition.substrate.name}
                      id={parameterDefinition.substrate.name}
                      value={formik.values[parameterDefinition.substrate.name]}
                      onChange={formik.handleChange}
                    >
                      <Tooltip
                        title={
                          <React.Fragment>
                            <a href="http://dx.doi.org/10.1007/s10570-013-0147-5">
                              Ref: Ding et al Cellulose 21, 863-871, 2014.
                            </a>
                          </React.Fragment>
                        }
                      >
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="36 polymers (e.g. maize)"
                        />
                      </Tooltip>

                      <Tooltip
                        title={
                          <React.Fragment>
                            <a href="https://doi.org/10.1073/pnas.1108942108">
                              Ref: Fernandes et al PNAS, vol. 108, no. 47,
                              E1195- E1203, 2011.
                            </a>
                          </React.Fragment>
                        }
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="24 polymers (e.g. spruce wood)"
                        />
                      </Tooltip>
                      <Tooltip
                        title={
                          <React.Fragment>
                            <a href="https://doi.org/10.1104/pp.113.228262">
                              Ref: Newman et al Plant Physiology, vol. 163, no.
                              4, 1558- 1567, 2013
                            </a>
                          </React.Fragment>
                        }
                      >
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="18 polymers (e.g. mung beans)"
                        />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              ) : (
                <></>
              )}
              {adhesionInputFieldsList}
              {crystalinityInputFieldsList}
              {substrateStructureInputFieldsList}
            </Grid>
          </Collapse>
        </List>
      </Paper>
    </>
  );
};

export default ParameterFormCard;
