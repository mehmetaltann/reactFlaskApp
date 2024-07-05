import Grid from "@mui/material/Unstable_Grid2";
import HomeSearchBar from "../features/homePage/HomeSearchBar";
import HomeInfoSection from "../features/homePage/HomeInfoSection";
import HomeTableSection from "../features/homePage/HomeTableSection";
import HomeTransections from "../features/homePage/HomeTransections";
import { isletmeData } from "../utils/isletmeData"; /* backend den gelecek data */
import { PageWrapper } from "../layouts/Wrappers";
import { useState, useEffect } from "react";

const Home = () => {
  const [searchData, setSearchData] = useState({
    unvan: "",
    vergiNo: "",
    firmaId: "",
  });

  const [isletme, setIsletme] = useState();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const findedIsletme = findByVal(searchData, isletmeData);
      setIsletme(findedIsletme);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchData]);

  const findByVal = (searchData, allData) => {
    const { unvan, vergiNo, firmaId } = searchData;
    if (unvan !== "") {
      let filterData = allData.filter((obj) => obj["unvan"].includes(unvan));
      return filterData[0];
    } else if (vergiNo !== "") {
      return allData.find((obj) => obj.vergiNo === vergiNo);
    } else if (firmaId !== "") {
      return allData.find((obj) => obj.id.toString() === firmaId);
    }
  };

  return (
    <PageWrapper>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid xs={12}>
          <HomeSearchBar
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </Grid>
        <Grid xs={12}>
          <HomeInfoSection isletme={isletme} />
        </Grid>
        <Grid xs={12}>
          <HomeTransections isletme={isletme} />
        </Grid>
        <Grid xs={12}>
          <HomeTableSection isletme={isletme} />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
