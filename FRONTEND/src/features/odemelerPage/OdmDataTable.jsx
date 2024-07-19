import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback } from "react";
import { isletmeData } from "../../utils/isletmeData";
import { IconButton } from "@mui/material";
import { dateFormat } from "../../utils/time-functions";
import {
  stringColumn,
  actionColumn,
  dateColumn,
} from "../../components/tables/columns";

const OdmDataTable = ({ odemeDurum }) => {
  const [isletmeler, setIsletmeler] = useState(isletmeData);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
  }, []);

  const result = [];

  for (const isletme of isletmeData) {
    for (const proje of isletme.projeler) {
      for (const odeme of proje.odemeler) {
        const listed = {
          id: odeme.id,
          unvan: isletme.unvan,
          vergiNo: isletme.vergiNo,
          projeAdı: proje.program + " - " + odeme.destek,
          projeBaslangic: dateFormat(proje.baslamaTarihi),
          destek: odeme.destek,
          karekod: odeme.karekod,
          tarih: dateFormat(odeme.tarih),
          tutar: odeme.tutar,
          durum: odeme.durum,
        };
        result.push(listed);
      }
    }
  }

  const filteredData =
    odemeDurum !== "TÜMÜ"
      ? result?.filter((item) => item.durum === odemeDurum)
      : result;

      
  const columns = [
    stringColumn("unvan", "Unvan", 400),
    stringColumn("vergiNo", "Vergi No", 120, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("projeAdı", "Proje", 300),

    stringColumn("karekod", "Karekod", 80),
    dateColumn("projeBaslangic", "Başlangıç Tarihi"),
    dateColumn("tarih", "Tarih"),
    stringColumn("tutar", "Tutar", 110, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("durum", "Durum", 120),

    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton key={index} size="small" color="error">
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
        data={filteredData}
        disableColumnResize
        disableDensitySelector
        disableColumnFilter
      />
    </div>
  );
};

export default OdmDataTable;
