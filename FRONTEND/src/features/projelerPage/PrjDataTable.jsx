import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback } from "react";
import { isletmeData } from "../../utils/isletmeData";
import { IconButton, Typography } from "@mui/material";
import { dateFormat, dateFormatNormal } from "../../utils/time-functions";
import {
  stringColumn,
  actionColumn,
  dateColumn,
  priceColumn,
  numberColumn,
} from "../../components/tables/columns";

const PrjDataTable = ({ projeDurum }) => {
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
      const listed = {
        id: proje.id,
        unvan: isletme.unvan,
        vergiNo: isletme.vergiNo,
        adı: proje.program,
        baslangic: dateFormat(proje.baslamaTarihi),
        sure: proje.sure,
        durum: proje.durum,
        tamamlanma: dateFormat(proje.tamamlanmaTarihi),
        takip: dateFormat(proje.takipTarihi),
      };
      result.push(listed);
    }
  }

  const filteredData =
    projeDurum !== "Tümü"
      ? result?.filter((item) => item.durum === projeDurum)
      : result;

  console.log(filteredData);

  const columns = [
    stringColumn("unvan", "Unvan", 400),
    stringColumn("vergiNo", "Vergi No", 120, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("adı", "Proje", 300),
    stringColumn("projeBaslangic", "Başlangıç Tarihi", 120),
    stringColumn("sure", "Unvan", 100),
    stringColumn("tamamlanmaTarihi", "Tamamlanma Tarih", 120),
    stringColumn("takipTarihi", "Takip Tarih", 120),

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

export default PrjDataTable;
