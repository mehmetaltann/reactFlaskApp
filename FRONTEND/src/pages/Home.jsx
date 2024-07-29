import Grid from "@mui/material/Unstable_Grid2";
import HomeSearchBar from "../features/homePage/HomeSearchBar";
import HomeInfoSection from "../features/homePage/HomeInfoSection";
import HomeTableSection from "../features/homePage/HomeTableSection";
import HomeTransections from "../features/homePage/HomeTransections";
import useAxios from "../hooks/useAxios";
import InfoBox from "../components/ui/InfoBox";
import { PageWrapper } from "../layouts/Wrappers";
import { useState, useEffect, Fragment, useCallback } from "react";

const Home = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });

  const { response, axiosFetch, setResponse, resStatus, error } = useAxios();
  const [openSnack, setOpenSnack] = useState(false);

  const fetchData = useCallback(
    (aramatext, aramatype) => {
      axiosFetch({
        method: "GET",
        url: "/isletmeara/" + aramatype + "/" + aramatext,
      });
    },
    [axiosFetch]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { unvan, vergiNo, firmaId } = searchData;
      if (unvan !== "") {
        fetchData(unvan, "unvan");
        setOpenSnack(true);
      } else if (vergiNo !== "") {
        fetchData(vergiNo, "vergino");
        setOpenSnack(true);
      } else if (firmaId !== "") {
        fetchData(firmaId, "id");
        setOpenSnack(true);
      } else {
        setResponse([]);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchData, fetchData]);

  return (
    <PageWrapper>
      {response["message"] && (
        <InfoBox
          resMessage={response["message"]}
          error={error}
          resStatus={resStatus}
          setOpenSnack={setOpenSnack}
          openSnack={openSnack}
        />
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
