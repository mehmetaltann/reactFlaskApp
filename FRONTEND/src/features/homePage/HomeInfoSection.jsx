import { Fragment, useContext, useState } from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { WorkContext } from "../../store/AppContext";
import { sektorData } from "../../utils/sektorData";
import InfoBox from "../../components/homePageComp/InfoBox";
import Grid from "@mui/material/Unstable_Grid2";
import ModalButton from "../../components/modal/ModalButton";
import ModalIconButton from "../../components/modal/ModelIconButton";
import OdemeForm from "../../components/forms/OdemeForm";
import ProjeForm from "../../components/forms/ProjeForm";
import IsletmeForm from "../../components/forms/IsletmeForm";

const HomeInfoSection = () => {
  const [isletme] = useContext(WorkContext);

  const [openUpdateIsletmeModal, setOpenUpdateIsletmeModal] = useState(false);
  const [openAddProjeModal, setOpenAddProjeModal] = useState(false);
  const [openAddOdemeModal, setOpenAddOdemeModal] = useState(false);

  const isletmeUpdatesubmitHandler = (values) => {
    const updatedRecord = {
      unvan: values.unvan,
      sistem_id: values.sistem_id,
      sektor_ismi: values.sektor_ismi,
      yetkili: values.yetkili,
      notlar: values.notlar,
      adres: values.adres,
      tel1: values.tel1,
      tel2: values.tel2,
      projeler: [],
      uets: values.uets,
      mail: values.mail,
    };

    console.log(updatedRecord);

    setOpenUpdateIsletmeModal(false);
  };

  /* isletme.tel1[Object.keys(isletme.tel1)[0]] */

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
                    <InfoBox data={isletme.tel1} />

                    <Divider orientation="vertical" />
                    <InfoBox data={isletme.tel2} />
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
