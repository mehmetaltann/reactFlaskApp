import useAxios from "../../hooks/useAxios";
import ModalButton from "../../components/modal/ModalButton";
import OdemeForm from "../../components/forms/OdemeForm";
import ProjeForm from "../../components/forms/ProjeForm";
import IsletmeForm from "../../components/forms/IsletmeForm";
import InfoBox from "../../components/ui/InfoBox";
import { Fragment, useState } from "react";
import { todayDateInput } from "../../utils/time-functions";
import { Card, Stack } from "@mui/material";
import { getChangedValues } from "../../utils/helper-functions";

const HomeTransections = ({ isletme, setSearchData }) => {
  const [openUpdateIsletmeModal, setOpenUpdateIsletmeModal] = useState(false);
  const [openAddProjeModal, setOpenAddProjeModal] = useState(false);
  const [openAddOdemeModal, setOpenAddOdemeModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const { axiosFetch, resStatus, error, resMessage } = useAxios();

  const isletmeInitialValues = {
    unvan: isletme.unvan,
    vergiNo: isletme.vergiNo,
    sistemId: isletme.sistemId,
    naceKodu: isletme.naceKodu,
    yetkili: isletme.yetkili,
    notlar: isletme.notlar ?? "",
    adres: isletme.adres,
    tel1: isletme.tel1 ?? "",
    tel2: isletme.tel2 ?? "",
    uets: isletme.uets ?? "",
    mail: isletme.mail ?? "",
  };

  const isletmeUpdatesubmitHandler = async (values) => {
    const editIsletmeRecord = getChangedValues(values, isletmeInitialValues);
    await axiosFetch({
      method: "POST",
      url: "/isletmeguncelle/" + isletme.id,
      requestConfig: {
        data: editIsletmeRecord,
      },
    });
    setOpenUpdateIsletmeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: isletme.id,
    }));
    setOpenSnack(true);
  };

  const projeAddSubmitHandler = async (values) => {
    let projeId = "id" + Math.random().toString(16).slice(2);
    const addProjeRecord = {
      _id: projeId,
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
    await axiosFetch({
      method: "POST",
      url: "/projeekle",
      requestConfig: {
        data: addProjeRecord,
      },
    });
    setOpenAddProjeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: values.isletmeId,
    }));
    setOpenSnack(true);
  };

  const odemeAddSubmitHandler = async (values) => {
    let odemeId = "id" + Math.random().toString(16).slice(2);
    const addOdemeRecord = {
      _id: odemeId,
      isletmeId: isletme.id,
      id: odemeId,
      projeId: values.projeId,
      karekod: values.karekod,
      tarih: values.tarih,
      tutar: values.tutar,
      destek: values.destek,
      durum: "BEKLEMEDE",
    };
    await axiosFetch({
      method: "POST",
      url: "/odemeekle",
      requestConfig: {
        data: addOdemeRecord,
      },
    });
    setOpenAddOdemeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: values.isletmeId,
    }));
    setOpenSnack(true);
  };

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1, p: 1 }}>
          {resMessage && (
            <InfoBox
              resMessage={resMessage}
              error={error}
              resStatus={resStatus}
              setOpenSnack={setOpenSnack}
              openSnack={openSnack}
            />
          )}
          <Stack
            direction={{ sm: "row" }}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <ModalButton
              modalOpen={openUpdateIsletmeModal}
              setModalOpen={setOpenUpdateIsletmeModal}
              title="İsletme Bilgileri Güncelle"
              buttonTitle="Firma Bilgisi Güncelle"
              color="primary"
              height="75vh"
              width="80vh"
              maxW="33%"
              minW="33%"
              size="medium"
              maxh="4vh"
              endIconLogo="editnote"
            >
              <IsletmeForm
                submitHandler={isletmeUpdatesubmitHandler}
                initialData={isletmeInitialValues}
                buttonName="GÜNCELLE"
              />
            </ModalButton>

            <ModalButton
              title="Proje Ekle"
              buttonTitle="Proje Ekle"
              height="40vh"
              modalOpen={openAddProjeModal}
              setModalOpen={setOpenAddProjeModal}
              size="medium"
              width="120%"
              maxW="33%"
              minW="33%"
              maxh="4vh"
              endIconLogo="project"
            >
              <ProjeForm
                submitHandler={projeAddSubmitHandler}
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
              maxW="33%"
              minW="33%"
              maxh="4vh"
              modalOpen={openAddOdemeModal}
              setModalOpen={setOpenAddOdemeModal}
              size="medium"
              endIconLogo="payment"
            >
              <OdemeForm
                submitHandler={odemeAddSubmitHandler}
                isletme={isletme}
                initialData={{
                  projeId: "",
                  karekod: "",
                  destek: "",
                  tarih: todayDateInput,
                  tutar: 0,
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
