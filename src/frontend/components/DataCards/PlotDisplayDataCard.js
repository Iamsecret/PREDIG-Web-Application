import { Card, styled } from "@mui/material";
import * as React from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const PlotDisplayDataCard = (params) => {
  const url_string = params.is_fitting ? "fitting" : "simulation";

  return (
    <Card>
      <Img
        sx={{ padding: "0.8em" }}
        src={
          "/api/" +
          url_string +
          "/runs/" +
          params.id +
          "/plots/" +
          params.filename
        }
      ></Img>
    </Card>
  );
};

export default PlotDisplayDataCard;
