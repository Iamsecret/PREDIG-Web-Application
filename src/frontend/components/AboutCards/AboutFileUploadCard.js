import { Button, Divider, Paper, Typography } from "@mui/material";
const AboutFileUploadCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Experimental saccharification time-course data uploading
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em" }}>
        You can upload experimental saccharification time-course data by
        clicking on the file upload icon in each "Experimental Sample" box.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        The experimental data should be uploaded as a utf-8 encoded text file.
        On each row, the file must contain a time-point in hours, a tabulation,
        and the corresponding saccharification percentage ranging from 0 to 100.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        The uploaded file should not contain any other information, for instance
        no title for the time and the saccharification percentage columns.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        Data for glucose and xylose must be uploaded as two independent files.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        To see how correctly formatted files look, download the examples below.
      </Typography>
      <Button
        sx={{ margin: "1em" }}
        href={"/api/sample_files/experimental/expe_saccharification_glc.txt"}
        variant="contained"
        color="primary"
      >
        Download example file GLC
      </Button>
      <Button
        sx={{ margin: "1em" }}
        href={"/api/sample_files/experimental/expe_saccharification_xyl.txt"}
        variant="contained"
        color="primary"
      >
        Download example file XYL
      </Button>
    </Paper>
  );
};

export default AboutFileUploadCard;
