import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import { useCallback, useEffect } from "react";
import { IconButton } from "@mui/material";
import { stringColumn, actionColumn } from "../../components/tables/columns";

const PrjDataTable = ({ projeDurum }) => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  const fetchProjeData = () => {
    const urlText = "/projeler/" + projeDurum;
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: urlText,
    });
  };

  useEffect(() => {
    fetchProjeData();
  }, [projeDurum]);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
  }, []);

  const updateProje = (editProjeRecord, isletmeId, id) => {
    const urlText = "/projeguncelle/" + isletmeId + "/" + id;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
      requestConfig: {
        data: editProjeRecord,
      },
    });
  };

  const deleteProje = (isletmeId, id) => {
    const urlText = "/projesil/" + isletmeId + "/" + id;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
    });
  };

  const columns = [
    stringColumn("unvan", "Unvan", 400),
    stringColumn("vergiNo", "Vergi No", 120, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("program", "Proje", 300),
    stringColumn("baslamaTarihi", "Başlangıç Tarihi", 120),
    stringColumn("sure", "Unvan", 100),
    stringColumn("tamamlanmaTarihi", "Tamamlanma Tarih", 120),
    stringColumn("takipTarihi", "Takip Tarih", 120),
    stringColumn("durum", "Durum", 120),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              deleteProje(params.row.isletmeId, params.row.id);
              fetchProjeData();
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

export default PrjDataTable;
