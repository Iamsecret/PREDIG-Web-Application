import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import vid from "../../../img/animation.mp4";
import cc_svg from "../../../img/cc.svg";

const HomeAboutCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h4">
        PREDIG
      </Typography>
      <Divider />
      <Grid container columns={12}>
        <Grid item xs={6}>
          <Typography
            paragraph
            variant="body1"
            sx={{ margin: "1em", marginLeft: "3em", marginRight: "3em" }}
          >
            PREDIG aims to support the design of important biorefinery
            operations by simulating the enzymatic conversion of lignocellulosic
            biomass.
          </Typography>
          <Typography
            paragraph
            variant="body1"
            sx={{ margin: "1em", marginLeft: "3em", marginRight: "3em" }}
          >
            Our software is characterised by its flexibility. It allows you to
            study different biomass sources, varying in molecular composition
            and structure, to take into account pre-treatments through their
            impact on crystallinity of both cellulose and hemicellulose, as well
            as the presence of defined amorphous defects in the crystalline
            regions, and to select enzyme cocktails varying in composition and
            kinetics.
          </Typography>
          <Typography
            paragraph
            variant="body1"
            sx={{ margin: "1em", marginLeft: "3em", marginRight: "3em" }}
          >
            PREDIG generates stochastic simulations following a Gillespie
            algorithm. It thereby mimics the natural randomness of biochemical
            reactions, while accounting for the detailed three-dimensional
            structure of the substrate, and the sterical constraints that emerge
            from the latter. The physical representation of the biological
            system{" "}
            <Box display="inline" sx={{ fontStyle: "italic" }}>
              in silico
            </Box>{" "}
            for instance accounts for the shielding of cellulose by the
            surrounding hemicellulose matrix and lignin polymers, and the size
            of the degrading enzymes. Because of the computing cost of such
            simulations, we model a single microfibril of length 200 glucose
            bonds, for the cellulose polymers. On the video clip showed here,
            cellulose is represented in green, hemicellulose in yellow, and
            lignin in blue.
          </Typography>
          <Typography
            paragraph
            variant="body1"
            sx={{ margin: "1em", marginLeft: "3em", marginRight: "3em" }}
          >
            In addition to simulating the degradation of lignocellulose and
            visualising it, PREDIG allows you to fit the model parameters to
            your experimental time-course saccharification data. By returning
            the values of parameters that are intrinsically difficult to measure
            experimentally, PREDIG's fitting procedure offers you the
            possibility to learn which features of the plant biomass explain the
            recalcitrance to saccharification.
          </Typography>

          <Typography
            paragraph
            variant="body1"
            sx={{ margin: "1em", marginLeft: "3em", marginRight: "3em" }}
          >
            <Box display="inline">
              <img src={cc_svg} width={20}></img>
            </Box>{" "}
            All results obtained from our softwares, e.g. by using this web
            interface, are licensed under the CC BY 4.0 terms, including that
            attribution must be given to the creator, the PREDIG team, by citing
            our release article and our{" "}
            <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>
              previous work
            </a>
            .
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <video width="100%" height="100%" autoPlay muted loop>
            <source src={vid} type="video/mp4" />
          </video>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomeAboutCard;
