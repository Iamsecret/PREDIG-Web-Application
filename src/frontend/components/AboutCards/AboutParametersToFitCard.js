import { Divider, Paper, Typography } from "@mui/material";

const AboutParametersToFitCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Parameters to be fitted
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em" }}>
        Parameters to be fitted must be selected here. Those can either be
        kinetic parameters or initial configuration parameters. We assume that
        the first ones are common to all samples, due to similar experimental
        conditions, while the second ones are typically specific to each sample.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        The values that will be entered in the fields below for kinetic
        parameters and initial configuration parameters, will serve as starting
        points for the fitting procedure. A parameter that is not chosen to be
        fitted, will be kept fixed.
      </Typography>
    </Paper>
  );
};

export default AboutParametersToFitCard;
