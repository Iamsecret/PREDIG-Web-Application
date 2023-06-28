import { Card, Typography } from "@mui/material";
import React from "react";

const RequestedSimulation = () => {
  return (
    <>
      <Card sx={{ margin: "1em" }}>
        <Typography>
          To start the simulation please click the link we send to you via
          email.
        </Typography>
      </Card>
    </>
  );
};
export default RequestedSimulation;
