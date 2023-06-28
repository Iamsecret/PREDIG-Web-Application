import { Card, CardMedia } from "@mui/material";

const HomePictureCard = () => {
  return (
    <Card sx={{ margin: "1em" }}>
      <CardMedia
        height="300"
        component="h1"
        sx={{
          color: "white",
          textAlign: "center",
          padding: "2.5em",
          fontSize: "4em",
          margin: "0",
        }}
        image="https://images.unsplash.com/photo-1567547921486-f280c2f53b5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="It's corn"
      >
        Plant Cell Wall Degradation Simulation
      </CardMedia>
    </Card>
  );
};

export default HomePictureCard;
