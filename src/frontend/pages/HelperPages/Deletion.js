import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Deletion = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios.get("/api/user/delete/" + params.deletionUuid).then((res) => {
      setIsLoading(false);
      setResponse(res.data);
    });
  }, [params.deletionUuid]);

  const display = isLoading ? (
    <Typography sx={{ textAlign: "center", padding: "0.5em" }}>
      Loading...
    </Typography>
  ) : (
    <Typography sx={{ textAlign: "center", padding: "0.5em" }}>
      {response.msg}
    </Typography>
  );

  return (
    <>
      <Paper sx={{ margin: "1em" }} elevation={5}>
        <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h5">
          Deletion
        </Typography>
        {display}
      </Paper>
    </>
  );
};
export default Deletion;
