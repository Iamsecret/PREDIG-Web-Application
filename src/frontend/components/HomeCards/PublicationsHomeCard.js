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
import figure from "../../../img/Figure_7_c.png";

const PublicationsHomeCard = () => {
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
        <CardHeader title="Publications" />
        <Divider />
      </Box>
      <CardMedia
        sx={{ padding: "1em" }}
        component="img"
        image={figure}
        alt="Saccarfification curves"
      />
      <CardContent>
        <Typography variant="body2">
          To find our publications on the plant cell wall degradation, click
          below. The source codes of this software are available on Github (
          <a
            href={
              "https://github.com/psde-777/PREDIG_biophysical_model_N_fitting_algorithm"
            }
          >
            biophysical model
          </a>{" "}
          &{" "}
          <a href={"https://github.com/Iamsecret/PREDIG-Web-Application"}>
            web application
          </a>
          ). Please note that the biophysical model codes (
          <a
            href={
              "https://github.com/psde-777/PREDIG_biophysical_model_N_fitting_algorithm/blob/master/LICENSE"
            }
          >
            License
          </a>
          ;{" "}
          <a
            href={
              "https://github.com/psde-777/PREDIG_biophysical_model_N_fitting_algorithm/blob/master/NOTICE.txt"
            }
          >
            Copyright notice
          </a>
          ) and the web application codes (
          <a
            href={
              "https://github.com/Iamsecret/PREDIG-Web-Application/blob/master/LICENSE"
            }
          >
            License
          </a>
          ;{" "}
          <a
            href={
              "https://github.com/Iamsecret/PREDIG-Web-Application/blob/master/NOTICE.txt"
            }
          >
            Copyright notice
          </a>
          ) are both licensed and copyrighted. In addition, all results obtained
          from them are licensed under the CC BY 4.0 terms, including that
          attribution must be given to the creator, the PREDIG team, by citing
          our release article and our{" "}
          <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>
            previous work
          </a>
          .
        </Typography>
      </CardContent>
      <Box>
        <Divider />
        <CardActions disableSpacing>
          <Button
            sx={{ textAlign: "right" }}
            variant="contained"
            href="https://adelaideraguin.github.io/#/publications"
          >
            Learn More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default PublicationsHomeCard;
