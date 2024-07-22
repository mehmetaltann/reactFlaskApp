import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import { useCallback, useEffect } from "react";
import { IconButton } from "@mui/material";
import { stringColumn, actionColumn } from "../../components/tables/columns";

const IslDataTable = () => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  const fetchIsletmeData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/isletmeler",
    });
  };

  useEffect(() => {
    fetchIsletmeData();
  }, []);

  const deleteIsletme = (isletmeId) => {
    const urlText = "/isletmesil/" + isletmeId;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
    });
  };

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
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
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              deleteIsletme(params.row.id);
              fetchIsletmeData();
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    }),
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataTableFrame
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
        getRowSpacing={getRowSpacing}
        density="standard"
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
