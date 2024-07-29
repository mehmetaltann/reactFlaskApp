import { Fragment, memo } from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import InfoBox from "../../components/homePageComp/InfoBox";
import Grid from "@mui/material/Unstable_Grid2";

const HomeInfoSection = ({ isletme }) => {
  let emptyOdemeArray = [];

  for (const proje of isletme.projeler) {
    for (const odeme of proje.odemeler) {
      emptyOdemeArray.push(odeme);
    }
  }
  const totalPayment = emptyOdemeArray
    .reduce((n, { tutar }) => n + tutar, 0)
    .toFixed(2);

  console.log(totalPayment);

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1 }}>
          <Grid
            container
            sx={{ p: 3 }}
            spacing={{ xs: "4", md: "3" }}
            justifyContent={{ md: "space-between" }}
          >
            <Grid container item="true" direction={"column"}>
              <Grid item="true">
                <InfoBox data={isletme.unvan} title={"Firma :"} />
              </Grid>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={3}>
                  <InfoBox data={isletme.vergiNo} title={"Vergi No :"} />
                  <InfoBox data={isletme.sistemId} title={"Sistem ID :"} />
                  <InfoBox data={isletme.notlar} title={"Bilgi :"} />
                </Stack>
              </Grid>
              <Grid item="true">
                <InfoBox data={isletme.naceKodu} title={"Sektör :"} />
              </Grid>
            </Grid>

            <Grid container item="true" direction={"column"}>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={3}>
                  <InfoBox data={isletme.yetkili} title="Yetkili :" />

                  <InfoBox data={isletme.mail} title="Mail :" />
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "primary.main", fontWeight: 600 }}
                    >
                      Telefon :
                    </Typography>
                    <InfoBox data={isletme.tel1} />
                    <Divider orientation="vertical" />
                    <InfoBox data={isletme.tel2} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item="true">
                <Stack direction={{ md: "row" }} spacing={3}>
                  <InfoBox data={isletme.adres} title="Adres :" />
                  <InfoBox data={isletme.uets} title="UETS :" />
                </Stack>
                <InfoBox
                  data={totalPayment}
                  para="true"
                  title="Toplam Ödeme :"
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </Fragment>
  );
};

export default memo(HomeInfoSection);
