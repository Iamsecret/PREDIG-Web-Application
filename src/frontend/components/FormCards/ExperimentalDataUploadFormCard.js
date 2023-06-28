import { useCallback } from "react";

const {
  Paper,
  Typography,
  Divider,
  Grid,
  useTheme,
  TextField,
  Box,
} = require("@mui/material");

const { default: ExperimentalDataTable } = require("../ExperimentalDataTable");

const ExperimentalDataUploadFormCard = ({ dataset_nr, formik, setData }) => {
  const setXylData = useCallback((xyl_data) => {
    setData((prev) => {
      return { glc: prev.glc, xyl: xyl_data };
    });
  }, []);

  const setGlcData = useCallback((glc_data) => {
    setData((prev) => {
      return { glc: glc_data, xyl: prev.xyl };
    });
  }, []);

  let theme = useTheme();

  const customChange = (event) => {
    formik.handleChange(event);
  };

  return (
    <Paper
      sx={{
        margin: "1em",
        border: " 6px solid",
        borderColor: theme.palette.secondary.main,
      }}
      elevation={5}
    >
      <Box sx={{ textAlign: "center", padding: "0.5em" }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name={"exp_sample_name_" + dataset_nr}
          id={"exp_sample_name_" + dataset_nr}
          error={Boolean(formik.errors["exp_sample_name_" + dataset_nr])}
          helperText={
            Boolean(formik.errors["exp_sample_name_" + dataset_nr])
              ? "Name must have between 1 and 30 characters"
              : ""
          }
          onChange={customChange}
          label={"Sample name #" + dataset_nr}
          variant="outlined"
          value={formik.values["exp_sample_name_" + dataset_nr]}
        ></TextField>
      </Box>

      <Divider />
      <Grid container>
        <Grid item xs={6}>
          <ExperimentalDataTable
            setData={setGlcData}
            columnValueName="Glucose %"
          ></ExperimentalDataTable>
        </Grid>
        <Grid item xs={6}>
          <ExperimentalDataTable
            setData={setXylData}
            columnValueName="Xylose %"
          ></ExperimentalDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExperimentalDataUploadFormCard;
