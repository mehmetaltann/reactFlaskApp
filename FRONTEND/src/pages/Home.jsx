import Grid from "@mui/material/Unstable_Grid2";
import HomeSearchBar from "../features/homePage/HomeSearchBar";
import HomeInfoSection from "../features/homePage/HomeInfoSection";
import { PageWrapper } from "../layouts/Wrappers";

const Home = () => {
  return (
    <PageWrapper>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid xs={12}>
          <HomeSearchBar />
        </Grid>
        <Grid xs={12}>
          <HomeInfoSection />
        </Grid>
        <Grid></Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
