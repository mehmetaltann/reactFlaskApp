import Grid from "@mui/material/Unstable_Grid2";
import HomeSearchBar from "../features/homePage/HomeSearchBar";
import HomeInfoSection from "../features/homePage/HomeInfoSection";
import HomeTableSection from "../features/homePage/HomeTableSection";
import HomeTransections from "../features/homePage/HomeTransections";
import useAxios from "../hooks/useAxios";
import { PageWrapper } from "../layouts/Wrappers";
import { useState, useEffect, Fragment, useCallback } from "react";

const Home = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });

  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  const fetchData = useCallback((aramatext, aramatype) => {
    axiosFetch({
      method: "GET",
      url: "/isletmeara/by" + aramatype + "/" + aramatext,
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { unvan, vergiNo, firmaId } = searchData;
      if (unvan !== "") {
        fetchData(unvan, "unvan");
      } else if (vergiNo !== "") {
        fetchData(vergiNo, "vergino");
      } else if (firmaId !== "") {
        fetchData(firmaId, "id");
      } else {
        setResponse([]);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchData]);

  return (
    <PageWrapper>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        {response.length !== 0 ? (
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
