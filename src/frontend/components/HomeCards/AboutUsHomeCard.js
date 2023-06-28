import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import picture from "../../../img/team.jpg";

const AboutUsHomeCard = () => {
  return (
    <Card
      style={{
        minHeight: "650px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      elevation={5}
    >
      <Box>
        <CardHeader title="About Us" />
        <Divider />
      </Box>

      <CardMedia
        sx={{
          padding: "1em",
        }}
        component="img"
        image={picture}
        alt="Team"
      />
      <CardContent>
        <Typography variant="body2">
          We are a recently established and rapidly growing team of
          international researchers funded by third party funding at Heinrich
          Heine University Düsseldorf. The team is led by Dr Adélaïde Raguin.
          The PREDIG project is implemented in collaboration with the team{" "}
          <a
            href={
              "https://www.fz-juelich.de/en/ibg/ibg-2/forschung/research-groups/alternative-biomass"
            }
          >
            Alternative Biomass
          </a>
          , led by Dr Holger Klose in the Plant Sciences (IBG-2) laboratory, at
          the Research Center of Jülich.
        </Typography>
      </CardContent>

      <Box>
        <Divider />
        <CardActions>
          <Button variant="contained" href="https://adelaideraguin.github.io/">
            Learn More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default AboutUsHomeCard;
