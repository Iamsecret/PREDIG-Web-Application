import { Divider, Paper, Typography } from "@mui/material";

const AboutKineticParametersCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Kinetic Parameters
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em" }}>
        Here you must set the values of the parameters relating to: i) the
        enzyme kinetic rates, ii) their inhibition by end-products, iii) the
        processivity of cellobiohydrolase, iv) the adhesion of enzymes to
        lignin, and v) the impact of crystallinity on the action of enzymes.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        i) We assume Michaelis-Menten kinetics to model the action of diffusive
        enzymes (i. e. endoglucanase, β-glucosidase, and xylanase) and the
        attachment of the processive enzyme cellobiohydrolase to the free end of
        a cellulose polymer. To set these kinetic rates, you can either enter
        values of your choice, or select from those of the tabulated
        micro-organisms that have been taken from the{" "}
        <a href={"https://www.brenda-enzymes.org"}>BRENDA</a> database.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        ii) We consider competitive inhibition with irreversible binding of the
        end-product to the active site of the enzyme. We define the value of an
        enzyme inhibition parameter by an end-product as the fraction of the
        number of molecules of that end-product that irreversibly bind to the
        enzyme, such that the latter cannot perform its catalytic action.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        iii) To model the processive action of the cellobiohydrolase enzyme, the
        parameter 'CBH processive reaction rate' denotes the number of
        processive steps per unit of time performed by each attached CBH enzyme,
        which corresponds to the number of cellobiose molecules released per
        unit of time per CBH enzyme.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        iv) We consider that enzymes can irreversibly bind to lignin, depending
        on the amount of the latter that is still available for binding. The
        lignin adhesion parameter is the same for all enzymes. Its value is
        equal to the number of monolignols involved in the binding of a single
        enzyme.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        v) We consider that both cellulose and hemicellulose can exhibit
        crystalline and amorphous regions, that are more or less difficult to
        digest, respectively. For each polymer type, the value of the
        crystallinity ratio measures how manyfold is a crystalline bond more
        difficult to digest as compared to an amorphous one.
      </Typography>
    </Paper>
  );
};

export default AboutKineticParametersCard;
