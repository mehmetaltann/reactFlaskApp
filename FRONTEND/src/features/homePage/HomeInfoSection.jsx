import { Fragment, useContext } from "react";
import { Card, Divider, Paper, Stack, Typography } from "@mui/material";
import { WorkContext } from "../../store/AppContext";
import InfoBox from "../../components/homePageComp/InfoBox";
import Grid from "@mui/material/Unstable_Grid2";

const HomeInfoSection = () => {
  const [isletme] = useContext(WorkContext);

  if (isletme) {
    console.log(isletme.tel1[Object.keys(isletme.tel1)[0]]);
  }

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1 }}>
          <Grid
            container
            sx={{ p: 4 }}
            spacing={{xs:"4", md:"3"}}
            justifyContent={{ md: "space-between" }}
          >
            <Grid container item="true" direction={"column"}>
              <Grid item="true">
                <InfoBox data={isletme.unvan} title={"Firma :"} />
              </Grid>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={4}>
                  <InfoBox data={isletme.vergi} title={"Vergi No :"} />
                  <InfoBox data={isletme.id} title={"Sistem ID :"} />
                  <InfoBox data={isletme.bilgi} title={"Bilgi :"} />
                </Stack>
              </Grid>
              <Grid item="true">
                <InfoBox data={isletme.sektor_ismi} title={"Sektör :"} />
              </Grid>
            </Grid>

            <Grid container item="true" direction={"column"}>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={4}>
                  <InfoBox data={isletme.yetkili} title="Yetkili :" />
                  <InfoBox data={isletme.mail} title="Mail :" />
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "primary.main", fontWeight: 600 }}
                    >
                      Telefon :
                    </Typography>
                    <InfoBox
                      data={isletme.tel1[Object.keys(isletme.tel1)[0]]}
                    />
                    <Divider orientation="vertical" flexItem />
                    <InfoBox
                      data={isletme.tel2[Object.keys(isletme.tel2)[0]]}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={4}>
                  <InfoBox data={isletme.adres} title="Adres :" />
                  <InfoBox title="UETS :" />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </Fragment>
  );
};

export default HomeInfoSection;
