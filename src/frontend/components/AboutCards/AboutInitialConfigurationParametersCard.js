import { Divider, Paper, Typography } from "@mui/material";

const AboutInitialConfigurationParametersCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h6">
        Initial Configuration Parameters
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em" }}>
        Here you must set the values of the simulation parameters relating to:
        i) the enzyme concentrations, ii) the substrate composition, and iii)
        the substrate structure.
      </Typography>

      <Typography sx={{ padding: "1em" }}>
        i) We consider that the overall reaction solution mix is optimised and
        fixed, such that a single microfibril of mass 3.7 x 10<sup>-18</sup> g
        is surrounded by a volume of 2.4 x 10<sup>-17</sup> mL that contains 50
        enzyme molecules. These values correspond to a substrate concentration
        of 84 g/L and an overall enzyme concentration of 1.9 mmol/L. Based on
        these assumptions, you are only requested to tune the composition of the
        enzyme cocktail by setting the relative abundance (percentage) of each
        enzyme type.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        ii) We consider that the substrate is made of three components:
        cellulose, hemicellulose, and lignin. The cellulose core of the
        microfibril is surrounded by hemicellulose and lignin, that form a
        complex matrix of polymers of distinct lengths, with gaps and holes,
        while all cellulose polymers have the same length set to 200 bonds, for
        reasonable computing times. Cellulose abundance varies from 1 to 100%,
        when that of hemicellulose and lignin both vary from 0 to 99%. The
        abundance percentages of cellulose, hemicellulose, and lignin must
        sum-up to 1.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        iii) To set the structure of the substrate, you have the possibility to
        both select the number of cellulose polymers that constitute the core of
        the microfibril, and to finely tune the crystallinity of both cellulose
        and hemicelluose. To set the crystallinity, you must enter the fraction
        of crystalline bonds, for cellulose and hemicellulose, respectively.
        Crystalline bonds occupy the middle region along the length of the
        microfibril, while amorphous bonds are typically found at the
        extremities of the latter. Besides, defects, for instance caused by
        pre-treatments, can be present in the crystalline region of cellulose,
        and in that of hemicellulose. They are controlled by two parameters. The
        fraction of defects sets what fraction of the amorphous bonds are
        present as patchy defects randomly located in these crystalline regions,
        instead of at the boundaries of the microfibril. Precisely, defects can
        be both on the outermost layer of the crystalline cellulose core, and on
        the adjacent layer of hemicellulose. The second parameter determines
        what fraction of the polymers at the outermost layer of cellulose holds
        defects, thereby also setting the location of the adjacent hemicellulose
        ones.
      </Typography>
    </Paper>
  );
};

export default AboutInitialConfigurationParametersCard;
