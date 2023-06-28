import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../config/constants.config";
import PlotDisplayDataCard from "../components/DataCards/PlotDisplayDataCard";
import DownloadAnimationButton from "../components/DownloadAnimationButton";
import DownloadRunDataButton from "../components/DownloadRunDataButton";
import ParameterTable from "../components/ParameterTable";

const SimulationRun = () => {
  const params = useParams();

  const [isFinished, setIsFinished] = useState(false);

  const [kineticParameters, setKineticParameters] = useState([]);
  const [initialConfigurationParameters, setInitialConfigurationParameters] =
    useState([]);

  const [runData, setRunData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(
        "/api/simulation/runs/" +
          params.runId +
          "/plots/" +
          CONSTANTS.SIMULATION_SACCARIFICATION_PLOT_NAME
      ),
      axios.get("/api/simulation/runs/" + params.runId).then((resp) => {
        setRunData(resp.data);
      }),
      axios
        .get("/api/simulation/runs/" + params.runId + "/parameters")
        .then((resp) => {
          setKineticParameters(resp.data.kinetic_parameters);
          setInitialConfigurationParameters(
            resp.data.initial_configuration_parameters
          );
        }),
    ]).then(
      () => setIsFinished(true),
      () => setIsFinished(false)
    );
  }, [params.runId]);

  return (
    <>
      {isFinished ? (
        <>
          <Paper sx={{ margin: "1em" }} elevation={5}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", padding: "1em" }}
            >
              Simulation Run
            </Typography>
            <Divider />

            <Box sx={{ margin: "1em" }}>
              <Typography>UUID: {runData.uuid}</Typography>
              <Typography>Run By: {runData.created_by}</Typography>
              <Typography>Started at: {runData.started_at}</Typography>
              <Typography>Finished at: {runData.finished_at}</Typography>
              <Typography>
                Is Fitting: {runData.is_fitting ? "Yes" : "No"}
              </Typography>
              <DownloadRunDataButton run_uuid={params.runId} />

              {runData.is_animation ? (
                <DownloadAnimationButton run_uuid={params.runId} />
              ) : (
                <></>
              )}
            </Box>
          </Paper>

          <Grid
            container
            spacing={1}
            justifyContent="space-around"
            alignItems="center"
            direction="row"
          >
            <Grid item xs={5.8}>
              <PlotDisplayDataCard
                id={params.runId}
                filename={CONSTANTS.SIMULATION_SACCARIFICATION_PLOT_NAME}
                is_fitting={false}
              />
            </Grid>
            <Grid item xs={5.8}>
              <PlotDisplayDataCard
                id={params.runId}
                filename={CONSTANTS.SIMULATION_ENZYME_ACTIVITY_PLOT_NAME}
                is_fitting={false}
              />
            </Grid>
          </Grid>

          <Paper sx={{ margin: "1em" }} elevation={5}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", padding: "1em" }}
            >
              {" "}
              Parameters{" "}
            </Typography>
            <Divider />

            <Grid
              container
              spacing={1}
              justifyContent="space-around"
              alignItems="start"
              direction="row"
            >
              <Grid item xs={5.8}>
                <ParameterTable
                  flipOrder={false}
                  tableName="Kinetic Parameter"
                  parameterList={kineticParameters}
                />
              </Grid>
              <Grid item xs={5.8}>
                <ParameterTable
                  flipOrder={false}
                  tableName="Initial Configuration Parameter"
                  parameterList={initialConfigurationParameters}
                />
              </Grid>
            </Grid>
          </Paper>
        </>
      ) : (
        <Typography>
          Simulation is still running, please reload the page when it's
          finished.
        </Typography>
      )}
    </>
  );
};

export default SimulationRun;
