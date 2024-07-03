import { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import { WorkContext } from "../../store/AppContext";
import { allData } from "../../utils/data";
import { Card, TextField, Typography, Stack } from "@mui/material";

const HomeSearchBar = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });
  const [isletme, setIsletme] = useContext(WorkContext);

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
      const iData = findByVal(searchData, allData);
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

  return (
    <Card sx={{ p: 1 }}>
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
              disabled={searchData.firmaId !== "" || searchData.vergiNo !== ""}
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
    </Card>
  );
};

export default HomeSearchBar;
