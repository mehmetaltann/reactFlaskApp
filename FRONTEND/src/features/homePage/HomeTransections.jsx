import { Fragment, useState } from "react";
import { sektorData } from "../../utils/sektorData";
import { programData } from "../../utils/programData";
import { destekData } from "../../utils/destekData";
import { todayDateInput } from "../../utils/time-functions";
import { Card, Stack } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import ModalButton from "../../components/modal/ModalButton";
import OdemeForm from "../../components/forms/OdemeForm";
import ProjeForm from "../../components/forms/ProjeForm";
import IsletmeForm from "../../components/forms/IsletmeForm";

const HomeTransections = ({ isletme, setSearchData }) => {
  const [openUpdateIsletmeModal, setOpenUpdateIsletmeModal] = useState(false);
  const [openAddProjeModal, setOpenAddProjeModal] = useState(false);
  const [openAddOdemeModal, setOpenAddOdemeModal] = useState(false);
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  const addProje = (postData) => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/projeekle",
      requestConfig: {
        data: postData,
      },
    });
  };

  const addOdeme = (postData) => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/odemeekle",
      requestConfig: {
        data: postData,
      },
    });
  };

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
    addProje(addProjeRecord);
    setOpenAddProjeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: values.isletmeId,
    }));
  };

  const odemeAddSubmitHandler = (values) => {
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
    addOdeme(addOdemeRecord);
    setOpenAddOdemeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: values.isletmeId,
    }));
  };

  return (
    <Fragment>
      {isletme && (
        <Card sx={{ mt: 1, p: 1 }}>
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
              height="65vh"
              width="80vh"
              maxW="33%"
              minW="33%"
              size="medium"
              maxh="4vh"
              endIconLogo="editnote"
            >
              <IsletmeForm
                submitHandler={isletmeUpdatesubmitHandler}
                sektorData={sektorData}
                initialData={{
                  id: isletme.id,
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
                  projeler: isletme.projeler ?? "",
                }}
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
                destekData={destekData}
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
