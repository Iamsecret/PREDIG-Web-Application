import { Divider, Paper, Typography } from "@mui/material";
import React from "react";

const AboutSimulationCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h4">
        Simulate the degradation of lignocellulose and visualise it
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em" }}>
        General use instructions for this page
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          To set the parameters to values of your choice
        </Typography>
        , fill the forms "Kinetic Parameters" and "Initial Configuration
        Parameters".
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          Fields are pre-filled with default values
        </Typography>{" "}
        that allow you to reproduce the experimental saccharification
        time-course data for corn stover after high intensity pre-treatment used
        in our previous study{" "}
        <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>
          (Behle and Raguin 2021)
        </a>
        . You can reset the parameter values to those of this case example by
        clicking RESET TO DEFAULT VALUES in each box.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          You can easily repeat or modify previously run simulations
        </Typography>{" "}
        by uploading their corresponding parameter files. To do so, click the
        file upload icon in the “Kinetic parameters” and the “Initial
        configuration parameters” boxes.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          When hovering your mouse over a parameter
        </Typography>
        , further details are provided, including its units and the range in
        which its value can be varied.
      </Typography>

      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          Details about the model features that cannot be varied here
        </Typography>{" "}
        are provided in our{" "}
        <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>article</a>{" "}
        relating to the release of this application.
      </Typography>

      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          To start the simulation
        </Typography>
        , enter your email address in the box at the bottom of the page, and
        click START THE SIMULATION. There, if you wish, you can also request the
        video clip of the simulation. You will receive an email containing a
        link to be followed for actually starting the simulation. Once the
        simulation ends, you will receive a new email with a new link. Follow
        the latter to retrieve the results. The email address provided can also
        be used under the RUNS tab to search for the runs you submitted. It will
        be visible there.
      </Typography>
    </Paper>
  );
};
export default AboutSimulationCard;
