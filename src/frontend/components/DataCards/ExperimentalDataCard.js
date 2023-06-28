import AddIcon from "@mui/icons-material/Add";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import RemoveIcon from "@mui/icons-material/Remove";
const {
  Paper,
  Typography,
  Divider,
  IconButton,
  Grid,
  FormControlLabel,
  Switch,
} = require("@mui/material");

const ExperimentalDataCard = ({
  experimentCount,
  addExperimentComponent,
  removeExperimentComponent,
  setIsOneInitialParameterSet,
  isOneInitialParameterSet,
}) => {
  const handleChange = (e) => {
    setIsOneInitialParameterSet(!e.target.checked);
  };

  const iconList = [
    <Filter1Icon sx={{ marginTop: "0.3em" }} />,
    <Filter2Icon sx={{ marginTop: "0.3em" }} />,
    <Filter3Icon sx={{ marginTop: "0.3em" }} />,
    <Filter4Icon sx={{ marginTop: "0.3em" }} />,
    <Filter5Icon sx={{ marginTop: "0.3em" }} />,
  ];

  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Number of samples to be simultaneously fitted
      </Typography>
      <Divider />

      <Typography sx={{ padding: "1em" }}>
        The fitting procedure returns best fitting parameter values such that
        kinetic parameters are common to all samples, while initial
        configuration parameters are specific to each of them. Still, you have
        the option to start the search for the best fitting initial
        configuration parameters from a set of parameter values that is
        identical for all samples.
      </Typography>
      <FormControlLabel
        sx={{ padding: "1em" }}
        control={
          <Switch checked={!isOneInitialParameterSet} onChange={handleChange} />
        }
        label="Use starting values for the initial configuration parameters that are distinct for each sample"
      />

      <Typography sx={{ padding: "1em" }}>
        Choose how many (up to five) samples should be fitted simultaneously.
        Each sample can be characterised by both glucose and xylose
        saccharification time-courses.
      </Typography>

      <Grid container alignContent="center" justifyContent="center">
        <Grid item>
          <IconButton color="primary" onClick={removeExperimentComponent}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item>{iconList[experimentCount - 1]}</Grid>
        <Grid item>
          <IconButton color="primary" onClick={addExperimentComponent}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExperimentalDataCard;
