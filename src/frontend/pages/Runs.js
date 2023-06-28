import {
  Box,
  Divider,
  List,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RunListItem from "../components/RunListItem";

const Runs = () => {
  const [runs, setRuns] = useState([]);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [displayedRuns, setDisplayedRuns] = useState([]);

  const [filterEmail, setFilterEmail] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [nrFittingRuns, setNrFittingRuns] = useState(0);

  const nrItemsPerPage = 10;

  useEffect(() => {
    axios.get("/api/runs").then((resp) => {
      let runs = resp.data;
      let count = 0;
      for (let index = 0; index < runs.length; index++) {
        const run = runs[index];
        if (run.is_fitting) {
          count++;
        }
      }
      setNrFittingRuns(count);

      runs.sort((a, b) => {
        if (a.started_at === "") {
          return 1;
        }
        if (b.started_at === "") {
          return -1;
        }
        let date_a = new Date(a.started_at);
        let date_b = new Date(b.started_at);

        return date_a > date_b ? -1 : 1;
      });
      setRuns(runs);
    });
  }, []);

  useEffect(() => {
    var start = (pageIndex - 1) * nrItemsPerPage;
    var end = pageIndex * nrItemsPerPage;
    if (end > filteredRuns.length) {
      end = filteredRuns.length;
    }

    setDisplayedRuns(filteredRuns.slice(start, end));
  }, [pageIndex, filteredRuns]);

  useEffect(() => {
    var start = 0;
    var end = nrItemsPerPage;

    let filteredRuns = runs.filter((run) =>
      run.created_by.includes(filterEmail)
    );

    setFilteredRuns(filteredRuns);
    setDisplayedRuns(filteredRuns.slice(start, end));
    setPageIndex(1);
  }, [filterEmail, runs]);

  const handlePagination = (page) => {
    setPageIndex(page);
  };

  const filterEmailChange = (event) => {
    setFilterEmail(event.target.value);
  };

  return (
    <>
      <Paper s sx={{ margin: "1em" }} elevation={5}>
        <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h4">
          List of all Runs
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0.5em",
            }}
          >
            <Box>
              <Typography>Total number of runs: {runs.length}</Typography>
              <Typography>Number of fitting runs: {nrFittingRuns}</Typography>
              <Typography>
                Number of simulation runs: {runs.length - nrFittingRuns}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0.5em",
            }}
          >
            <Typography sx={{ marginRight: "1em" }}>
              You can filter the shown runs by the email address used.
            </Typography>
            <TextField
              onChange={filterEmailChange}
              variant="outlined"
              label="E-Mail"
              value={filterEmail}
            />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <List sx={{ minWidth: "50%" }}>
          {displayedRuns.map((run) => (
            <RunListItem
              uuid={run.uuid}
              created_by={run.created_by}
              started_at={run.started_at}
              finished_at={run.finished_at}
              is_fitting={run.is_fitting}
            />
          ))}
        </List>
      </Box>
      <Pagination
        onChange={(e, page) => handlePagination(page)}
        page={pageIndex}
        sx={{ display: "flex", justifyContent: "center" }}
        count={Math.ceil(filteredRuns.length / nrItemsPerPage)}
      />
    </>
  );
};
export default Runs;
