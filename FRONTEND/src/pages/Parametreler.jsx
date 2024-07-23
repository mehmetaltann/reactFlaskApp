import Grid from "@mui/material/Unstable_Grid2";
import useAxios from "../hooks/useAxios";
import axios from "../apis/isletmeDb";
import { PageWrapper } from "../layouts/Wrappers";
import { useState, useEffect, Fragment } from "react";
import { Card, Typography } from "@mui/material";

const Parametreler = () => {
  return (
    <PageWrapper>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Grid xs={12} sx={{p:2}}>
          <Card>
            <Typography>Programlar</Typography>
          </Card>
        </Grid>
        <Grid xs={12} sx={{p:2}}>
          <Card>
            <Typography>Destekler</Typography>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Parametreler;
