import Grid from "@mui/material/Unstable_Grid2";
import HomeSearchBar from "../features/homePage/HomeSearchBar";
import HomeInfoSection from "../features/homePage/HomeInfoSection";
import HomeTableSection from "../features/homePage/HomeTableSection";
import HomeTransections from "../features/homePage/HomeTransections";
import useAxios from "../hooks/useAxios";
import { PageWrapper } from "../layouts/Wrappers";
import { useState, useEffect, Fragment, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const Home = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });

  const { response, axiosFetch, setResponse, resStatus, error } = useAxios();
  const [openHomeSnack, setOpenHomeSnack] = useState(false);

  const fetchData = useCallback((aramatext, aramatype) => {
    axiosFetch({
      method: "GET",
      url: "/isletmeara/" + aramatype + "/" + aramatext,
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { unvan, vergiNo, firmaId } = searchData;
      if (unvan !== "") {
        fetchData(unvan, "unvan");
        setOpenHomeSnack(true);
      } else if (vergiNo !== "") {
        fetchData(vergiNo, "vergino");
        setOpenHomeSnack(true);
      } else if (firmaId !== "") {
        fetchData(firmaId, "id");
        setOpenHomeSnack(true);
      } else {
        setResponse([]);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchData]);

  const handleHomeClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenHomeSnack(false);
  };

  return (
    <PageWrapper>
      {response["message"] && (
        <Snackbar
          open={openHomeSnack}
          autoHideDuration={2000}
          onClose={handleHomeClose}
        >
          <Alert
            severity={resStatus == 200 ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
            onClose={handleHomeClose}
          >
            {response.message}
            {error}
          </Alert>
        </Snackbar>
      )}
      <Grid container alignItems={"center"} justifyContent={"center"}>
        {response["id"] ? (
          <Fragment>
            <Grid xs={12}>
              <HomeSearchBar
                searchData={searchData}
                setSearchData={setSearchData}
                isletme={response}
              />
            </Grid>
            <Grid xs={12}>
              <HomeInfoSection isletme={response} />
            </Grid>
            <Grid xs={12}>
              <HomeTransections
                isletme={response}
                setSearchData={setSearchData}
              />
            </Grid>
            <Grid xs={12}>
              <HomeTableSection
                isletme={response}
                setSearchData={setSearchData}
              />
            </Grid>
          </Fragment>
        ) : (
          <Grid xs={12}>
            <HomeSearchBar
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </Grid>
        )}
      </Grid>
    </PageWrapper>
  );
};

export default Home;

/*  



*/
