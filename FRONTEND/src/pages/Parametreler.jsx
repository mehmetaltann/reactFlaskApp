import Grid from "@mui/material/Unstable_Grid2";
import Destekler from "../features/parametrelerPage/Destekler";
import Programlar from "../features/parametrelerPage/Programlar";
import { PageWrapper } from "../layouts/Wrappers";

const Parametreler = () => {
  return (
    <PageWrapper>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Programlar />
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Destekler />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Parametreler;
