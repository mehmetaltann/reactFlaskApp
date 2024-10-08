import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import InfoBox from "../../components/ui/InfoBox";
import OnayBox from "../../components/ui/OnayBox";
import { dateFormatNormal } from "../../utils/time-functions";
import { useCallback, useEffect, useState } from "react";
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
          if (item.karekod?.trim() === "") {
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
  const { response, axiosFetch, resStatus, error, resMessage } = useAxios();
  const [openSnack, setOpenSnack] = useState(false);
  const [onayBoxInf, setOnayBoxInf] = useState({
    isOpen: false,
    content: "",
    onClickHandler: "",
    functionData: {},
  });
  const mutateRow = useFakeMutation();

  const fetchProjeData = useCallback(async () => {
    await axiosFetch({
      method: "GET",
      url: "/projeler/" + projeDurum,
    });
  }, [projeDurum]);

  useEffect(() => {
    fetchProjeData();
  }, [projeDurum]);

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
      await axiosFetch({
        method: "POST",
        url: "/projeguncelle/" + newRecord.isletmeId + "/" + newRecord.id,
        requestConfig: {
          data: newRecord,
        },
      });
      fetchProjeData();
      setOpenSnack(true);
      const res = await mutateRow(newRow);
      return res;
    },

    [mutateRow]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    response.message = error;
  }, []);

  const projeDeleteHandler = async ({ id, isletmeId, durum }) => {
    await axiosFetch({
      method: "POST",
      url: "/projesil/" + isletmeId + "/" + id,
    });
    await axiosFetch({
      method: "GET",
      url: "/projeler/" + durum,
    });
    setOnayBoxInf((prevFormData) => ({
      ...prevFormData,
      isOpen: false,
    }));
    setOpenSnack(true);
  };

  const columns = [
    stringColumn("unvan", "Unvan", 360),
    stringColumn("vergiNo", "Vergi No", 110, {
      cellClassName: "boldandcolorcell",
      filterable: false,
    }),
    stringColumn("program", "Proje", 330),
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
        const isletmeId = params.row.isletmeId;
        const id = params.row.id;
        const durum = params.row.durum;
        if (params.row.numberOfOdeme) {
          return;
        } else {
          return (
            <IconButton
              key={index}
              size="small"
              color="error"
              onClick={() => {
                setOnayBoxInf((prevFormData) => ({
                  ...prevFormData,
                  isOpen: true,
                  content: "İlgili Proje Silinecek Onaylıyor musunuz ?",
                  onClickHandler: projeDeleteHandler,
                  functionData: { id, isletmeId, durum },
                }));
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        }
      },
    }),
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {resMessage && (
        <InfoBox
          resMessage={resMessage}
          error={error}
          resStatus={resStatus}
          setOpenSnack={setOpenSnack}
          openSnack={openSnack}
        />
      )}
      {onayBoxInf.isOpen && (
        <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
      )}
      <DataTableFrame
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 100}
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
