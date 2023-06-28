import { Button } from "@mui/material";
import React from "react";

const DownloadAnimationButton = ({ run_uuid }) => {
  return (
    <Button
      sx={{ margin: "1em" }}
      href={"/api/simulation/runs/" + run_uuid + "/animation/download"}
      variant="contained"
      color="primary"
    >
      Download Animation
    </Button>
  );
};

export default DownloadAnimationButton;
