import { Button } from "@mui/material";
import React from "react";

const DownloadRunParametersButton = ({ run_uuid }) => {
  return (
    <Button href={"/api/simulation/runs/" + run_uuid + "/parameters/download"}>
      Download Parameters
    </Button>
  );
};

export default DownloadRunParametersButton;
