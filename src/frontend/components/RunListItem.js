import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RunListItem = ({
  uuid,
  created_by,
  started_at,
  finished_at,
  is_fitting,
}) => {
  const link_to = is_fitting ? "/fitting/runs/" : "/simulation/runs/";

  return (
    <ListItem>
      <Accordion sx={{ minWidth: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
          <Typography>UUID : {uuid}</Typography>
        </AccordionSummary>
        <Divider color="primary" />
        <AccordionDetails>
          <Typography>Created by: {created_by}</Typography>
          <Typography>Started at: {started_at}</Typography>
          <Typography>Finished at: {finished_at}</Typography>
          <Typography>Is Fitting: {is_fitting ? "Yes" : "No"}</Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button
              component={Link}
              to={link_to + uuid}
              variant="contained"
              color="primary"
            >
              Go To Run
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};

export default RunListItem;
