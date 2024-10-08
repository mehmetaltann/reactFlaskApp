import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../hooks/useAxios";
import InfoBox from "../../components/ui/InfoBox";
import OnayBox from "../../components/ui/OnayBox";
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
  const { response, axiosFetch, resStatus, error, resMessage } = useAxios();
  const [openSnack, setOpenSnack] = useState(false);
  const [onayBoxInf, setOnayBoxInf] = useState({
    isOpen: false,
    content: "",
    onClickHandler: "",
    functionData: {},
  });
  const mutateRow = useFakeMutation();

  const fetchOdemeData = useCallback(async () => {
    await axiosFetch({
      method: "GET",
      url: "/odemeler/" + odemeDurum,
    });
  }, [odemeDurum]);

  useEffect(() => {
    fetchOdemeData();
  }, [odemeDurum]);

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
      await axiosFetch({
        method: "POST",
        url:
          "/odemeguncelle/" +
          newRecord.isletmeId +
          "/" +
          newRecord.projeId +
          "/" +
          newRecord.id,
        requestConfig: {
          data: newRecord,
        },
      });
      setOpenSnack(true);
      fetchOdemeData();
      const res = await mutateRow(newRow);
      return res;
    },

    [mutateRow]
  );

  const odemeDeleteHandler = async ({ id, projeId, isletmeId }) => {
    await axiosFetch({
      method: "POST",
      url: "/odemesil/" + isletmeId + "/" + projeId + "/" + id,
    });
    setOnayBoxInf((prevFormData) => ({
      ...prevFormData,
      isOpen: false,
    }));
    setOpenSnack(true);
    fetchOdemeData();
  };

  const handleProcessRowUpdateError = useCallback((error) => {
    response.message = error;
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
        const isletmeId = params.row.isletmeId;
        const projeId = params.row.projeId;
        const id = params.row.id;
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              setOnayBoxInf((prevFormData) => ({
                ...prevFormData,
                isOpen: true,
                content: "İlgili Ödeme Silinecek Onaylıyor musunuz ?",
                onClickHandler: odemeDeleteHandler,
                functionData: { id, projeId, isletmeId },
              }));
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
        getEstimatedRowHeight={() => 200}
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
