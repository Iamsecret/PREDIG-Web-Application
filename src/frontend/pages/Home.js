import { Box, Grid } from "@mui/material";
import React from "react";
import HomeAboutCard from "../components/AboutCards/HomeAboutCard";
import AboutUsHomeCard from "../components/HomeCards/AboutUsHomeCard";
import FundingHomeCard from "../components/HomeCards/FundingHomeCard";
import PublicationsHomeCard from "../components/HomeCards/PublicationsHomeCard";
import HomePictureCard from "../components/HomePictureCard";

const Home = () => {
  return (
    <>
      <HomePictureCard />
      <HomeAboutCard />
      <Box sx={{ margin: "1em" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={3.5}>
            <AboutUsHomeCard />
          </Grid>
          <Grid item xs={3.5}>
            <PublicationsHomeCard />
          </Grid>
          <Grid item xs={3.5}>
            <FundingHomeCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Home;
