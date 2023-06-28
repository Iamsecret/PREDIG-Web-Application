import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import FooterBar from "./components/Bars/FooterBar";
import NavigationBar from "./components/Bars/NavigationBar";
import Fitting from "./pages/Fitting";
import FittingRun from "./pages/FittingRun";
import Deletion from "./pages/HelperPages/Deletion";
import RequestedFitting from "./pages/HelperPages/RequestedFitting";
import RequestedSimulation from "./pages/HelperPages/RequestedSimulation";
import StartFitting from "./pages/HelperPages/StartFitting";
import StartSimulation from "./pages/HelperPages/StartSimulation";
import Home from "./pages/Home";
import Runs from "./pages/Runs";
import Simulation from "./pages/Simulation";
import Run from "./pages/SimulationRun";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#346601",
    },
    secondary: {
      main: "#b9e1a5",
    },
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavigationBar />

        <Box
          sx={{
            minHeight: "calc(100vh - 200px)",
            backgroundImage:
              "linear-gradient(to right, #90A8C0, #699D39,#DEBC5B);",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/simulation" element={<Simulation />}></Route>
            <Route path="/fitting" element={<Fitting />}></Route>
            <Route path="/runs" element={<Runs />}></Route>
            <Route path="/simulation/runs/:runId" element={<Run />}></Route>
            <Route path="/fitting/runs/:runId" element={<FittingRun />}></Route>
            <Route
              path="/simulation/request"
              element={<RequestedSimulation />}
            ></Route>
            <Route
              path="/simulation/runs/start/:start_uuid"
              element={<StartSimulation />}
            ></Route>
            <Route
              path="/fitting/request"
              element={<RequestedFitting />}
            ></Route>
            <Route
              path="/fitting/runs/start/:start_uuid"
              element={<StartFitting />}
            ></Route>
            <Route
              path="/deletion/:deletionUuid"
              element={<Deletion />}
            ></Route>
          </Routes>
        </Box>
        <FooterBar />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
