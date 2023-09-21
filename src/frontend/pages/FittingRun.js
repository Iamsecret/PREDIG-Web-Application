import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../config/constants.config";
import PlotDisplayDataCard from "../components/DataCards/PlotDisplayDataCard";
import DownloadRunDataButton from "../components/DownloadRunDataButton";
import ParameterTable from "../components/ParameterTable";

const FittingRun = () => {
  const params = useParams();

  const [isFinished, setIsFinished] = useState(false);

  const [startingKineticParameters, setStartingKineticParameters] = useState(
    []
  );
  const [bestKineticParameters, setBestKineticParameters] = useState([]);

  const [startingInitialParametersList, setStartingInitialParametersList] =
    useState([]);
  const [bestInitialParametersList, setBestInitialParametersList] = useState(
    []
  );

  const [rSquaredList, setRSquaredList] = useState([]);

  const [kineticParametersToFit, setKineticParametersToFit] = useState([]);

  const [initParametersToFit, setInitParametersToFit] = useState([]);

  const [runData, setRunData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(
        "/api/fitting/runs/" +
          params.runId +
          "/plots/" +
          CONSTANTS.FITTING_SACCARIFICATION_GLC_PLOT_NAME
      ),
      axios.get("/api/fitting/runs/" + params.runId).then((resp) => {
        setRunData(resp.data);
      }),
      axios
        .get("/api/fitting/runs/" + params.runId + "/rSquared")
        .then((resp) => {
          setRSquaredList(resp.data);
        }),
      axios
        .get("/api/fitting/runs/" + params.runId + "/parameters")
        .then((resp) => {
          setStartingKineticParameters(resp.data.startKineticParameters);
          setBestKineticParameters(resp.data.bestKineticParameters);
          setStartingInitialParametersList(
            resp.data.startInitialParametersList
          );
          setBestInitialParametersList(resp.data.bestInitialParametersList);
        }),
      axios
        .get("/api/fitting/runs/" + params.runId + "/parametersToFit")
        .then((resp) => {
          console.log(resp.data);
          setKineticParametersToFit(resp.data.kineticList);
          setInitParametersToFit(resp.data.initList);
        }),
    ]).then(
      () => setIsFinished(true),
      () => setIsFinished(false)
    );
  }, [params.runId]);

  console.log(kineticParametersToFit);
  console.log(initParametersToFit);

  return (
    <>
      {isFinished ? (
        <>
          <Paper sx={{ margin: "1em" }} elevation={5}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", padding: "1em" }}
            >
              Fitting Run
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
              <DownloadRunDataButton
                run_uuid={params.runId}
              ></DownloadRunDataButton>
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
                filename={CONSTANTS.FITTING_SACCARIFICATION_GLC_PLOT_NAME}
                is_fitting={true}
              />
            </Grid>
            <Grid item xs={5.8}>
              <PlotDisplayDataCard
                id={params.runId}
                filename={CONSTANTS.FITTING_SACCARIFICATION_XYL_PLOT_NAME}
                is_fitting={true}
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
                  tableName="Starting Kinetic Parameters"
                  parameterList={startingKineticParameters}
                />
              </Grid>
              <Grid item xs={5.8}>
                <ParameterTable
                  flipOrder={true}
                  tableName="Best Kinetic Parameters"
                  parameterList={bestKineticParameters}
                  boldList={kineticParametersToFit}
                />
              </Grid>
            </Grid>
            {startingInitialParametersList.map((parameterList, i) => {
              return (
                <>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: "1em" }}
                  >
                    {" "}
                    Sample #{i + 1}{" "}
                  </Typography>
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
                        tableName="Starting Initial Configuration Parameters"
                        parameterList={startingInitialParametersList[i]}
                      />
                    </Grid>
                    <Grid item xs={5.8}>
                      <ParameterTable
                        flipOrder={true}
                        tableName="Best Initial Configuration Parameters"
                        parameterList={bestInitialParametersList[i]}
                        boldList={initParametersToFit}
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: "1em" }}
                  >
                    Coefficient of determination (R<sup>2</sup>)
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", paddingBottom: "1em" }}
                  >
                    Glucose R<sup>2</sup>:{" "}
                    {rSquaredList[i].glc === undefined
                      ? "N.A."
                      : rSquaredList[i].glc}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", paddingBottom: "1em" }}
                  >
                    Xylose R<sup>2</sup>:{" "}
                    {rSquaredList[i].xyl === undefined
                      ? "N.A."
                      : rSquaredList[i].xyl}
                  </Typography>
                  <Divider />
                </>
              );
            })}
          </Paper>
        </>
      ) : (
        <Typography>
          Fitting is still running, please reload the page when it's finished.
        </Typography>
      )}
    </>
  );
};

export default FittingRun;
