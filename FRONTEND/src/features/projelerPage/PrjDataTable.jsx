import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import { dateFormatNormal } from "../../utils/time-functions";
import { useCallback, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import {
  stringColumn,
  actionColumn,
  dateColumn,
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
              baslamaTarihi: item.baslamaTarihi,
              tamamlanmaTarihi: item.tamamlanmaTarihi,
              takipTarihi: item.takipTarihi,
              durum: item.durum,
              sure: item.sure,
            });
          }
        }, 200);
      }),
    []
  );
};

const PrjDataTable = ({ projeDurum }) => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();

  useEffect(() => {
    fetchProjeData();
  }, [projeDurum]);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
  }, []);

  const mutateRow = useFakeMutation();

  const fetchProjeData = () => {
    const urlText = "/projeler/" + projeDurum;
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: urlText,
    });
  };

  const updateProje = (editProjeRecord) => {
    const { id, isletmeId } = editProjeRecord;
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

  const processRowUpdate = useCallback(
    async (newRow) => {
      const newRecord = {
        id: newRow.id,
        isletmeId: newRow.isletmeId,
        sure: newRow.sure,
        baslamaTarihi: dateFormatNormal(newRow.baslamaTarihi),
        tamamlanmaTarihi: dateFormatNormal(newRow.tamamlanmaTarihi),
        takipTarihi: dateFormatNormal(newRow.takipTarihi),
        durum: newRow.durum,
      };
      updateProje(newRecord);
      fetchProjeData();
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
      filterable: false,
    }),
    stringColumn("program", "Proje", 270),
    dateColumn("baslamaTarihi", "Başlangıç Tarihi", 100, {
      cellClassName: "boldandcolorcell",
      editable: true,
    }),
    {
      field: "sure",
      headerName: "Süre",
      width: 70,
      filterable: false,
      headerClassName: "header",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 1;
        return { ...params.props, error: hasError };
      },
      headerAlign: "left",
      align: "left",
      editable: true,
      renderCell: (params) => `${params.value} ay`,
    },
    dateColumn("tamamlanmaTarihi", "Tamamlanma Tarih", 100, {
      editable: true,
    }),
    dateColumn("takipTarihi", "Takip Tarih", 100, {
      cellClassName: "boldandcolorcell",
      editable: true,
    }),
    {
      field: "gecenGunsayisi",
      headerName: "Gün",
      width: 100,
      editable: true,
      headerClassName: "header",
      headerAlign: "left",
      cellClassName: "boldandcolorcell",
      align: "left",
      renderCell: (params) => {
        if (params.row.gecenGunsayisi < 5) {
          return (
            <Typography variant="span" color="error">
              {params.row.gecenGunsayisi} Gün
            </Typography>
          );
        } else
          return (
            <Typography variant="span">
              {params.row.gecenGunsayisi} Gün
            </Typography>
          );
      },
    },
    {
      field: "durum",
      headerName: "Durum",
      width: 120,
      editable: true,
      headerClassName: "header",
      headerAlign: "left",
      cellClassName: "boldandcolorcell",
      align: "left",
      type: "singleSelect",
      valueOptions: [
        "Devam Ediyor",
        "Başarıyla Tamamlandı",
        "Başarısız Tamamlandı",
        "Durduruldu",
        "Bilgi Yok",
      ],
    },
    actionColumn({
      align: "center",
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
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </div>
  );
};

export default PrjDataTable;
