import SearchIcon from "@mui/icons-material/Search";
import InfoBox from "../../components/ui/InfoBox";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalButton from "../../components/modal/ModalButton";
import IsletmeForm from "../../components/forms/IsletmeForm";
import useAxios from "../../hooks/useAxios";
import OnayBox from "../../components/ui/OnayBox";
import { useState } from "react";
import {
  Card,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";

const HomeSearchBar = ({ searchData, setSearchData, isletme }) => {
  const [openAddIsletmeModal, setOpenAddIsletmeModal] = useState(false);
  const { axiosFetch, resStatus, error, resMessage } = useAxios();
  const [openSnack, setOpenSnack] = useState(false);
  const [onayBoxInf, setOnayBoxInf] = useState({
    isOpen: false,
    content: "",
    onClickHandler: "",
    functionData: {},
  });

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toLocaleUpperCase("tr-TR"),
    }));
  };

  const isletmeAddSubmitHandler = async (values) => {
    let isletmeId = "id" + Math.random().toString(20).slice(2);
    const addIsletmeRecord = {
      id: isletmeId,
      unvan: values.unvan.toLocaleUpperCase("tr-TR"),
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
      projeler: [],
    };
    await axiosFetch({
      method: "POST",
      url: "/isletmeekle",
      requestConfig: {
        data: addIsletmeRecord,
      },
    });
    setOpenAddIsletmeModal(false);
    setSearchData({
      unvan: "",
      vergiNo: values.vergiNo,
      firmaId: "",
    });
    setOpenSnack(true);
  };

  const isletmeDeleteHandler = async ({ isletmeId }) => {
    await axiosFetch({
      method: "GET",
      url: "/isletmesil/" + isletmeId,
    });
    setSearchData((prevFormData) => ({
      unvan: "",
      vergiNo: "",
      firmaId: "",
    }));
    setOpenSnack(true);
    setOnayBoxInf((prevFormData) => ({
      ...prevFormData,
      isOpen: false,
    }));
  };

  return (
    <Card>
      {resMessage && (
        <InfoBox
          resMessage={resMessage}
          error={error}
          resStatus={resStatus}
          setOpenSnack={setOpenSnack}
          openSnack={openSnack}
        />
      )}
      {onayBoxInf.isOpen && (
        <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
      )}
      <Stack
        sx={{ p: 1 }}
        alignItems={{ md: "center" }}
        justifyContent={"space-between"}
        direction={{ md: "row" }}
      >
        <Grid
          container
          spacing={4}
          sx={{ p: 1 }}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Grid item="true" sx={{ xs: { pr: 1 }, md: { pr: 4 } }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <SearchIcon sx={{ color: "primary.main" }} />
              <Typography sx={{ color: "primary.main" }} variant="h6">
                İşletme Ara
              </Typography>
            </Stack>
          </Grid>

          <Grid
            container
            item="true"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item="true">
              <TextField
                disabled={
                  searchData.firmaId !== "" || searchData.vergiNo !== ""
                }
                label="Unvan"
                name="unvan"
                variant="outlined"
                value={searchData.unvan}
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid item="true">
              <TextField
                disabled={searchData.firmaId !== "" || searchData.unvan !== ""}
                label="Vergi Numarası"
                variant="outlined"
                name="vergiNo"
                type="number"
                value={searchData.vergiNo}
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid item="true">
              <TextField
                disabled={searchData.vergiNo !== "" || searchData.unvan !== ""}
                label="Id"
                name="firmaId"
                variant="outlined"
                type="number"
                value={searchData.firmaId}
                onChange={handleInputsChange}
              />
            </Grid>
            {isletme?.projeler.length === 0 && (
              <Grid item="true">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    const isletmeId = isletme.id;
                    setOnayBoxInf((prevFormData) => ({
                      ...prevFormData,
                      isOpen: true,
                      content: "İlgili İşletme Silinecek Onaylıyor musunuz ?",
                      onClickHandler: isletmeDeleteHandler,
                      functionData: { isletmeId },
                    }));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Box sx={{ pr: { md: 9 }, pt: { xs: 2, md: 0 } }}>
          <ModalButton
            title="İşletme Ekle"
            buttonTitle="Yeni İşletme Kayıt"
            height="70vh"
            width="130%"
            variant="contained"
            modalOpen={openAddIsletmeModal}
            setModalOpen={setOpenAddIsletmeModal}
            size="large"
            endIconLogo="addnew"
          >
            <IsletmeForm
              submitHandler={isletmeAddSubmitHandler}
              initialData={{
                unvan: "",
                vergiNo: "",
                sistemId: "",
                naceKodu: "",
                yetkili: "",
                notlar: "",
                adres: "",
                tel1: "",
                tel2: "",
                uets: "",
                mail: "",
              }}
            />
          </ModalButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default HomeSearchBar;
