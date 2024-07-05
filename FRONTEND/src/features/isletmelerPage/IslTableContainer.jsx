import IslDataTable from "./IslDataTable";
import { DataTableWrapper } from "../../layouts/Wrappers";
import { Typography, Paper, Stack } from "@mui/material";

const IslTableContainer = () => {
  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 1, ml: 2, mr: 2 }}
      >
        <Typography variant="h6" color="info.main">
          İşletmeler
        </Typography>
      </Stack>
      <DataTableWrapper tableHeight={"78vh"} sxProps={{ p: { xs: 1, md: 2 } }}>
        <IslDataTable />
      </DataTableWrapper>
    </Paper>
  );
};

export default IslTableContainer;
