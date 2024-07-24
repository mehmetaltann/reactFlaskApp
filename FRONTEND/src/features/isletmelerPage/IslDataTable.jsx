import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import { stringColumn, actionColumn } from "../../components/tables/columns";

const IslDataTable = () => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();
  const [openSnack, setOpenSnack] = useState(false);

  const fetchIsletmeData = useCallback(async () => {
    axiosFetch({
      method: "GET",
      url: "/isletmeler",
    });
  }, []);

  useEffect(() => {
    fetchIsletmeData();
  }, []);

  const columns = [
    stringColumn("unvan", "Unvan", 500),
    stringColumn("vergiNo", "Vergi No", 120, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("naceKodu", "Sektör", 400),
    stringColumn("mail", "E-Mail", 250),
    stringColumn("notlar", "Notlar", 200),
    actionColumn({
      align: "center",
      renderCell: (params, index) => {
        if (params.row.numberOfProje) {
          return;
        } else {
          return (
            <IconButton
              key={index}
              size="small"
              color="error"
              onClick={async () => {
                await axiosFetch({
                  method: "POST",
                  url: "/isletmesil/" + params.row.id,
                });
                fetchIsletmeData();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        }
      },
    }),
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleClose}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {response.message}
        </Alert>
      </Snackbar>
      <DataTableFrame
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 100}
        density="compact"
        columns={columns}
        data={response}
        disableColumnResize
        disableDensitySelector
        disableColumnFilter
      />
    </div>
  );
};

export default IslDataTable;
