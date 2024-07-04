import { Fragment, useContext, useState } from "react";
import { WorkContext } from "../../store/AppContext";
import { sektorData } from "../../utils/sektorData";
import { programData } from "../../utils/programData";
import { destekData } from "../../utils/destekData";
import { todayDateInput } from "../../utils/time-functions";
import { Card, Stack } from "@mui/material";
import ModalButton from "../../components/modal/ModalButton";
import OdemeForm from "../../components/forms/OdemeForm";
import ProjeForm from "../../components/forms/ProjeForm";
import IsletmeForm from "../../components/forms/IsletmeForm";

const HomeTransections = () => {
  const [isletme] = useContext(WorkContext);
  const [openUpdateIsletmeModal, setOpenUpdateIsletmeModal] = useState(false);
  const [openAddProjeModal, setOpenAddProjeModal] = useState(false);
  const [openAddOdemeModal, setOpenAddOdemeModal] = useState(false);

  const isletmeUpdatesubmitHandler = (values) => {
    const editIsletmeRecord = {
      id: values.id,
      unvan: values.unvan,
      vergiNo: values.vergiNo,
      sistemId: values.sistemId,
      naceKodu: values.naceKodu,
      yetkili: values.yetkili,
      notlar: values.notlar,
      adres: values.adres,
      tel1: values.tel1,
      tel2: values.tel2,
      uets: values.uets,
      mail: values.mail,
      projeler: values.projeler,
    };

    setOpenUpdateIsletmeModal(false);
  };

  const projeAddSubmitHandler = (values) => {
    let projeId = "id" + Math.random().toString(16).slice(2);
    const addProjeRecord = {
      id: projeId,
      isletmeId: isletme.id,
      baslamaTarihi: values.baslamaTarihi,
      tamamlanmaTarihi: values.tamamlanmaTarihi,
      takipTarihi: values.takipTarihi,
      notlar: values.notlar,
      sure: values.sure,
      program: values.program,
      izleyici: values.izleyici,
      durum: "Devam Ediyor",
      odemeler: [],
    };

    setOpenAddProjeModal(false);
  };

  const odemeAddSubmitHandler = (values) => {
    let odemeId = "id" + Math.random().toString(16).slice(2);
    const addOdemeRecord = {
      id: odemeId,
      projeId: values.proje_id,
      karekod: values.tarih,
      tarih: values.tarih,
      tutar: values.tutar,
      destek: values.destek_isim,
      durum: "Beklemede",
    };

    setOpenAddOdemeModal(false);
  };

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1, p: 1 }}>
          <Stack
            direction={{ lg: "row" }}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <ModalButton
              modalOpen={openUpdateIsletmeModal}
              setModalOpen={setOpenUpdateIsletmeModal}
              title="İsletme Bilgileri Güncelle"
              buttonTitle="Firma Bilgisi Güncelle"
              color="primary"
              height="65vh"
              width="80vh"
              maxW="80vh"
              minW="45vh"
              size="large"
              maxh="4vh"
            >
              <IsletmeForm
                submitHandler={isletmeUpdatesubmitHandler}
                sektorData={sektorData}
                initialData={{
                  id: isletme.id,
                  unvan: isletme.unvan,
                  vergiNo: isletme.vergi,
                  sistemId: isletme.id,
                  naceKodu: isletme.sektor_ismi,
                  yetkili: isletme.yetkili,
                  notlar: isletme.notlar,
                  adres: isletme.adres,
                  tel1: isletme.tel1,
                  tel2: isletme.tel2,
                  uets: isletme.uets,
                  mail: isletme.mail,
                  projeler: isletme.projeler,
                }}
              />
            </ModalButton>

            <ModalButton
              title="Proje Ekle"
              buttonTitle="Proje Ekle"
              height="40vh"
              modalOpen={openAddProjeModal}
              setModalOpen={setOpenAddProjeModal}
              size="normal"
              width="120%"
              maxW="80vh"
              minW="45vh"
              maxh="4vh"
            >
              <ProjeForm
                submitHandler={projeAddSubmitHandler}
                programData={programData}
                initialData={{
                  program: "",
                  baslamaTarihi: todayDateInput,
                  tamamlanmaTarihi: todayDateInput,
                  takipTarihi: todayDateInput,
                  sure: "",
                  notlar: "",
                  izleyici: "",
                }}
              />
            </ModalButton>
            <ModalButton
              title="Ödeme Ekle"
              buttonTitle="Ödeme Ekle"
              height="35vh"
              maxW="80vh"
              minW="45vh"
              maxh="4vh"
              modalOpen={openAddOdemeModal}
              setModalOpen={setOpenAddOdemeModal}
              size="large"
            >
              <OdemeForm
                submitHandler={odemeAddSubmitHandler}
                destekData={destekData}
                isletme={isletme}
                initialData={{
                  projeId: "",
                  karekod: "",
                  destek: "",
                  tarih: todayDateInput,
                  tutar: "",
                }}
              />
            </ModalButton>
          </Stack>
        </Card>
      )}
    </Fragment>
  );
};

export default HomeTransections;
