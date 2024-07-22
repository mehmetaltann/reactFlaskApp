import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import moment from "moment";
import { dateFormat } from "../../utils/time-functions";
import { useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import {
  stringColumn,
  actionColumn,
  dateColumn,
} from "../../components/tables/columns";

const OdmDataTable = ({ odemeDurum }) => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  const fetchOdemeData = () => {
    const urlText = "/odemeler/" + odemeDurum;
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: urlText,
    });
  };

  useEffect(() => {
    fetchOdemeData();
  }, [odemeDurum]);

  const updateOdeme = (editOdemeRecord, isletmeId, projeId, odemeId) => {
    const urlText =
      "/odemeguncelle/" + isletmeId + "/" + projeId + "/" + odemeId;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
      requestConfig: {
        data: editOdemeRecord,
      },
    });
  };

  const deleteOdeme = (isletmeId, projeId, odemeId) => {
    const urlText = "/odemesil/" + isletmeId + "/" + projeId + "/" + odemeId;
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
    stringColumn("unvan", "Unvan", 400),
    stringColumn("vergiNo", "Vergi No", 120, {
      cellClassName: "boldandcolorcell",
    }),
    dateColumn("baslamaTarihi", "Başlangıç Tarihi", 100),
    stringColumn("program", "Proje", 300),
    stringColumn("karekod", "Karekod", 80),

    dateColumn("tarih", "Tarih", 100),
    stringColumn("tutar", "Tutar", 110, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("durum", "Durum", 120),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              deleteOdeme(
                params.row.isletmeId,
                params.row.projeId,
                params.row.id
              );
              fetchOdemeData();
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

export default OdmDataTable;
