import DataTableFrame from "../../components/tables/DataTableFrame";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback } from "react";
import { isletmeData } from "../../utils/isletmeData";
import { IconButton, Stack, Typography } from "@mui/material";
import { stringColumn, actionColumn } from "../../components/tables/columns";

const IslDataTable = () => {
  const [isletmeler, setIsletmeler] = useState(isletmeData);

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
          <IconButton key={index} size="small" color="error">
            <DeleteIcon />
          </IconButton>
        );
      },
    }),
  ];

  return (
    <DataTableFrame
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      getRowSpacing={getRowSpacing}
      density="standard"
      columns={columns}
      rows={isletmeler}
      disableColumnResize
      disableDensitySelector
      disableColumnFilter
    />
  );
};

export default IslDataTable;
