import { Fragment, useContext, useState } from "react";
import { WorkContext } from "../../store/AppContext";
import { sektorData } from "../../utils/sektorData";
import Grid from "@mui/material/Unstable_Grid2";
import ModalButton from "../../components/modal/ModalButton";
import ModalIconButton from "../../components/modal/ModelIconButton";
import OdemeForm from "../../components/forms/OdemeForm";
import ProjeForm from "../../components/forms/ProjeForm";
import IsletmeForm from "../../components/forms/IsletmeForm";
import { Card, Stack } from "@mui/material";

const HomeTransections = () => {
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

  const odemeAddSubmitHandler = (values) => {
    setOpenAddOdemeModal(false);
  };

  const projeAddSubmitHandler = (values) => {
    setOpenAddProjeModal(false);
  };

  const isletmeUpdateSubmitHandler = (values) => {
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

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1, p: 1 }}>
          <Stack
            direction={{ md: "row" }}
            spacing={4}
            justifyContent={"space-around"}
          >
            <ModalButton
              modalOpen={openUpdateIsletmeModal}
              setModalOpen={setOpenUpdateIsletmeModal}
              title="İsletme Bilgileri Güncelle"
              buttonTitle="Bilgi Güncelle"
              color="primary"
              height="65vh"
              maxW = "60vh"
              width="60vh"
              size="large"
            >
              <IsletmeForm
                submitHandler={isletmeUpdatesubmitHandler}
                sektorData={sektorData}
                initialData={{
                  unvan: isletme.unvan,
                  vergi: isletme.vergi,
                  sistem_id: isletme.id,
                  sektor_ismi: isletme.sektor_ismi,
                  yetkili: isletme.yetkili,
                  notlar: isletme.notlar,
                  adres: isletme.adres,
                  tel1: isletme.tel1,
                  tel2: isletme.tel2,
                  projeler: [],
                  uets: isletme.uets,
                  mail: isletme.mail,
                }}
              />
            </ModalButton>
            <ModalButton
              title="Proje Ekle"
              buttonTitle="Proje Ekle"
              height="30vh"
              width="100%"
              modalOpen={openAddProjeModal}
              setModalOpen={setOpenAddProjeModal}
              size="normal"
            >
              <ProjeForm />
            </ModalButton>
            <ModalButton
              title="Ödeme Ekle"
              buttonTitle="Ödeme Ekle"
              height="30vh"
              width="100%"
              modalOpen={openAddOdemeModal}
              setModalOpen={setOpenAddOdemeModal}
              size="large"
            >
              <OdemeForm />
            </ModalButton>
          </Stack>
        </Card>
      )}
    </Fragment>
  );
};

export default HomeTransections;
