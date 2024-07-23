import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import { useEffect, useCallback, useState } from "react";
import { dateFormatNormal } from "../../utils/time-functions";
import { IconButton } from "@mui/material";
import {
  stringColumn,
  actionColumn,
  dateColumn,
  priceColumn,
} from "../../components/tables/columns";

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.id?.trim() === "") {
            reject(new Error("Karekod Boş Olamaz"));
          } else {
            resolve({
              id: item.id,
              karekod: item.karekod,
              tarih: item.tarih,
              tutar: item.tutar,
              durum: item.durum,
            });
          }
        }, 200);
      }),
    []
  );
};

const OdmDataTable = ({ odemeDurum }) => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  useEffect(() => {
    fetchOdemeData();
  }, [odemeDurum]);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
  }, []);

  const mutateRow = useFakeMutation();

  const fetchOdemeData = () => {
    const urlText = "/odemeler/" + odemeDurum;
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: urlText,
    });
  };
  const updateOdeme = (editOdemeRecord) => {
    const { id, projeId, isletmeId } = editOdemeRecord;
    const urlText = "/odemeguncelle/" + isletmeId + "/" + projeId + "/" + id;
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

  const processRowUpdate = useCallback(
    async (newRow) => {
      const newRecord = {
        id: newRow.id,
        isletmeId: newRow.isletmeId,
        projeId: newRow.projeId,
        karekod: newRow.karekod,
        tarih: dateFormatNormal(newRow.tarih),
        tutar: newRow.tutar,
        durum: newRow.durum,
      };
      updateOdeme(newRecord);
      fetchOdemeData();
      const res = await mutateRow(newRow);
      return res;
    },

    [mutateRow]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    console.log(error);
  }, []);

  const columns = [
    stringColumn("unvan", "Unvan", 400),
    stringColumn("vergiNo", "Vergi No", 110, {
      cellClassName: "boldandcolorcell",
    }),
    dateColumn("baslamaTarihi", "Proje Başlama", 100),
    stringColumn("program", "Proje", 250),
    stringColumn("karekod", "Karekod", 100, {
      cellClassName: "boldandcolorcell",
      editable: true,
    }),

    dateColumn("tarih", "Tarih", 100, {
      editable: true,
    }),
    priceColumn("tutar", "Tutar", 120, {
      cellClassName: "boldandcolorcell",
      editable: true,
    }),
    {
      field: "durum",
      headerName: "Durum",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["ÖDENDİ", "BEKLEMEDE"],
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
    },
    stringColumn("gecenGunsayisi", "Gün", 80),
    actionColumn({
      align: "center",
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
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </div>
  );
};

export default OdmDataTable;
