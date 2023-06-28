import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const StartFitting = () => {
  const params = useParams();

  useEffect(() => {
    axios.get("/api/runs/start/" + params.start_uuid);
  }, [params.start_uuid]);

  return (
    <>
      <Paper sx={{ margin: "1em" }} elevation={5}>
        <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h5">
          Start Fitting
        </Typography>
        <Typography sx={{ textAlign: "center", padding: "0.5em" }}>
          Started Fitting
        </Typography>
      </Paper>
    </>
  );
};
export default StartFitting;
