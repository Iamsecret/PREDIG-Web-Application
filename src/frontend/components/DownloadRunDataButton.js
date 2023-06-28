import { Button } from "@mui/material";
import React from "react";

const DownloadRunDataButton = ({ run_uuid }) => {
  return (
    <Button
      sx={{ margin: "1em" }}
      href={"/api/simulation/runs/" + run_uuid + "/data/download"}
      variant="contained"
      color="primary"
    >
      Download Data
    </Button>
  );
};

export default DownloadRunDataButton;
