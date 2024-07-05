import { PageWrapper } from "../layouts/Wrappers";
import { Container } from "@mui/material";
import { isletmeData } from "../utils/isletmeData"; /* backend den gelecek data */
import { useState } from "react";

const Odemeler = () => {
  const [tumOdemeler, setTumOdemeler] = useState();

  const result = [];

  for (const isletme of isletmeData) {
    for (const proje of isletme.projeler) {
      for (const odeme of proje.odemeler) {
        const listed = {
          unvan: isletme.unvan,
          vergiNo: isletme.vergiNo,
          projeAdı: proje.program,
          projeBaslangic: proje.baslamaTarihi,
          destek: odeme.destek,
          karekod: odeme.karekod,
          tarih: odeme.tarih,
          durum: odeme.durum,
        };
        result.push(listed);
      }
    }
  }

  console.log(result);

  /*
    const totalPayment = odemeler
    .reduce((n, { tutar }) => n + tutar, 0)
    .toFixed(2);*/

  return (
    <PageWrapper>
      <Container>Odemeler</Container>
    </PageWrapper>
  );
};

export default Odemeler;
