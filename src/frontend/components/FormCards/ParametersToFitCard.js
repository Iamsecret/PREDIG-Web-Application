import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import PARAMETER_DEFINITIONS from "../../../config/param.config";

const ParametersToFitCard = ({ formik }) => {
  let theme = useTheme();
  return (
    <Paper
      sx={{
        margin: "1em",
        border: "6px solid",
        borderColor: theme.palette.secondary.main,
      }}
      elevation={5}
    >
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Parameters to be fitted
      </Typography>
      <Divider />
      <Grid
        container
        sx={{ justifyContent: "space-around", margin: "0.3em" }}
        spacing={1}
        columns={25}
      >
        <Grid item xs={25}>
          <Typography sx={{ margin: "1em" }}>Kinetic Parameters</Typography>
        </Grid>
        {PARAMETER_DEFINITIONS[0].parameters.map((definition, index) => {
          return definition.isUsedForFitting ? (
            <Grid item xs={5}>
              <Tooltip title={definition.tooltip}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={"is_used_" + definition.name}
                      checked={formik.values["is_used_" + definition.name]}
                      onChange={formik.handleChange}
                    />
                  }
                  label={definition.displayName}
                />
              </Tooltip>
            </Grid>
          ) : (
            <></>
          );
        })}
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={25}>
          <Typography sx={{ margin: "1em", marginTop: "2em" }}>
            Initial Configuration Parameters
          </Typography>
        </Grid>
        {PARAMETER_DEFINITIONS[1].parameters.map((definition, index) => {
          return definition.isUsedForFitting ? (
            <Grid item xs={5}>
              <Tooltip title={definition.tooltip}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={"is_used_" + definition.name}
                      checked={formik.values["is_used_" + definition.name]}
                      onChange={formik.handleChange}
                    />
                  }
                  label={definition.displayName}
                />
              </Tooltip>
            </Grid>
          ) : (
            <></>
          );
        })}
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </Paper>
  );
};

export default ParametersToFitCard;
