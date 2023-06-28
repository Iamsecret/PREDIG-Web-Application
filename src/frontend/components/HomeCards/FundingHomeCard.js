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

const FundingHomeCard = () => {
  return (
    <Card
      style={{
        minHeight: "700px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      elevation={5}
    >
      <Box>
        <CardHeader title="Funding" />
        <Divider />
      </Box>
      <CardMedia
        sx={{
          padding: "1em",
          maxWidth: 280,
          margin: "0 auto",
        }}
        component="img"
        image="https://www.biosc.de/lw_resource/datapool/systemfiles/elements/images/691c994f-f902-11e6-8c78-dead53a91d31/current/image/BioSC-Logo-330x230.jpg"
        alt="BioSC Logo"
      />
      <CardContent>
        <Typography variant="body2">
          This project is funded by the German Bioeconomy Science Center. The
          scientific activities of the Bioeconomy Science Center are financially
          supported by the Ministry of Culture and Science within the framework
          of the NRW Strategieprojekt BioSC (No. 313/323-400-002 13). To learn
          more about BioSC, you can visit their homepage linked below.
        </Typography>
      </CardContent>
      <Box>
        <Divider />
        <CardActions disableSpacing>
          <Button variant="contained" href="https://www.biosc.de/predig_en">
            Learn More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default FundingHomeCard;
