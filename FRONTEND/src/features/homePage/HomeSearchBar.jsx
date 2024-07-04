import { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import ModalButton from "../../components/modal/ModalButton";
import IsletmeForm from "../../components/forms/IsletmeForm";
import { WorkContext } from "../../store/AppContext";
import { isletmeData } from "../../utils/isletmeData";
import { sektorData } from "../../utils/sektorData";
import { Card, TextField, Typography, Box, Stack } from "@mui/material";

const HomeSearchBar = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });
  const [isletme, setIsletme] = useContext(WorkContext);
  const [openAddIsletmeModal, setOpenAddIsletmeModal] = useState(false);

  const findByVal = (sData, aData) => {
    const { unvan, vergiNo, firmaId } = sData;
    if (unvan !== "") {
      let filterData = aData.filter((obj) => obj["unvan"].includes(unvan));
      return filterData[0];
    } else if (vergiNo !== "") {
      return aData.find((obj) => obj.vergi == vergiNo);
    } else if (firmaId !== "") {
      return aData.find((obj) => obj.id == firmaId);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const iData = findByVal(searchData, isletmeData);
      setIsletme(iData);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchData]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toUpperCase(),
    }));
  };

  const isletmeAddSubmitHandler = (values) => {
    let isletmeId = "id" + Math.random().toString(20).slice(2);
    const addIsletmeRecord = {
      id: isletmeId,
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
      projeler: [],
    };

    setOpenAddIsletmeModal(false);
  };

  return (
    <Card>
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
          <Grid item="true" sx={{ pr: 8 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              spacing={1}
            >
              <SearchIcon sx={{ color: "primary.main" }} fontSize="large" />
              <Typography sx={{ color: "primary.main" }} variant="h6">
                İşletme Ara
              </Typography>
            </Stack>
          </Grid>

          <Grid container item="true">
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
          </Grid>
        </Grid>

        <Box sx={{ pr: { md: 9 }, pt: { xs: 2, md: 0 } }}>
          <ModalButton
            title="İşletme Ekle"
            buttonTitle="Yeni İşletme Kayıt"
            height="65vh"
            width="130%"
            variant="contained"
            modalOpen={openAddIsletmeModal}
            setModalOpen={setOpenAddIsletmeModal}
            size="large"
          >
            <IsletmeForm
              submitHandler={isletmeAddSubmitHandler}
              sektorData={sektorData}
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
