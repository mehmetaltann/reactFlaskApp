import OdmDataTable from "./OdmDataTable";
import AltanSelect from "../../components/ui/AltanSelect";
import { useState } from "react";
import { DataTableWrapper } from "../../layouts/Wrappers";
import { Typography, Paper, Stack } from "@mui/material";

export const odemeDurumsData = [
  { value: "ÖDENDİ", label: "Ödendi" },
  { value: "BEKLEMEDE", label: "Beklemede" },
];

const OdmTableContainer = () => {
  const [odemeDurum, setOdemeDurum] = useState("BEKLEMEDE");

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 1, ml: 2, mr: 2 }}
      >
        <Typography variant="h6" color="info.main">
          Ödemeler
        </Typography>
        <AltanSelect
          id="tarih"
          defaultValue={"BEKLEMEDE"}
          value={odemeDurum}
          minWidth="30ch"
          onChange={setOdemeDurum}
          data={odemeDurumsData}
          dataTextAttr="label"
          dataValueAttr="value"
        />
      </Stack>
      <DataTableWrapper tableHeight={"78vh"} sxProps={{ p: { xs: 1, md: 2 } }}>
        <OdmDataTable odemeDurum={odemeDurum} />
      </DataTableWrapper>
    </Paper>
  );
};

export default OdmTableContainer;
