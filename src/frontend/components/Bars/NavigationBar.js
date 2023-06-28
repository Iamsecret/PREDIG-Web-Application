import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../../img/logo3.jpg";

const NavigationBar = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "white", marginBottom: "0.5em", marginTop: "0.5em" }}
      >
        <Toolbar disableGutters>
          <Box sx={{ paddingRight: "1em", paddingLeft: "1em" }}>
            <a href="/">
              <img src={logo} alt="predig" width="150px" />
            </a>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              fontWeight: 500,
              letterSpacing: ".2rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Plant Cell Wall Degradation Simulation
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{
                color: "black",
                backgroundColor: useMatch({
                  path: useResolvedPath("/").pathname,
                  end: true,
                })
                  ? "#b9e1a5"
                  : "",
              }}
              component={Link}
              to="/"
              variant="outline"
              color="primary"
            >
              Home
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: useMatch({
                  path: useResolvedPath("/simulation").pathname,
                  end: true,
                })
                  ? "#b9e1a5"
                  : "",
              }}
              component={Link}
              to="/simulation"
              variant="outline"
              color="primary"
            >
              Simulation
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: useMatch({
                  path: useResolvedPath("/fitting").pathname,
                  end: true,
                })
                  ? "#b9e1a5"
                  : "",
              }}
              component={Link}
              to="/fitting"
              variant="outline"
              color="primary"
            >
              Fitting
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: useMatch({
                  path: useResolvedPath("/runs").pathname,
                  end: true,
                })
                  ? "#b9e1a5"
                  : "",
              }}
              component={Link}
              to="/runs"
              variant="outline"
              color="primary"
            >
              Runs
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavigationBar;
