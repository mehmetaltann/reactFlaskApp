import PrjDataTable from "./PrjDataTable";
import AltanSelect from "../../components/ui/AltanSelect";
import { useState } from "react";
import { DataTableWrapper } from "../../layouts/Wrappers";
import { Typography, Paper, Stack } from "@mui/material";

export const projeDurumsData = [
  { value: "Devam Ediyor", label: "Devam Ediyor" },
  { value: "Başarıyla Tamamlandı", label: "Başarıyla Tamamlandı" },
  { value: "Başarısız Tamamlandı", label: "Başarısız Tamamlandı" },
  { value: "Durduruldu", label: "Durduruldu" },
  { value: "Bilgi Yok", label: "Bilgi Yok" },
  { value: "Tümü", label: "Tümü" },
];

const PrjTableContainer = () => {
  const [projeDurum, setProjeDurum] = useState("Devam Ediyor");

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 1, ml: 2, mr: 2 }}
      >
        <Typography variant="h6" color="info.main">
          Projeler
        </Typography>
        <AltanSelect
          id="projeDurum"
          defaultValue={"Devam Ediyor"}
          value={projeDurum}
          minWidth="30ch"
          onChange={setProjeDurum}
          data={projeDurumsData}
          dataTextAttr="label"
          dataValueAttr="value"
        />
      </Stack>
      <DataTableWrapper tableHeight={"78vh"} sxProps={{ p: { xs: 1, md: 2 } }}>
        <PrjDataTable projeDurum={projeDurum} setProjeDurum={setProjeDurum} />
      </DataTableWrapper>
    </Paper>
  );
};

export default PrjTableContainer;
