import { dateFormat } from "../../utils/time-functions";

export const dateColumn = (fieldName, headerName, width = 100, rest) => {
  return {
    field: fieldName,
    headerName: headerName,
    width: width,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    renderCell: (params) => dateFormat(params.value),
    ...rest,
  };
};

export const stringColumn = (fieldName, headerName, width, rest) => {
  return {
    field: fieldName,
    headerName: headerName,
    width: width,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    ...rest,
  };
};

export const priceColumn = (fieldName, headerName, width, rest) => {
  return {
    field: fieldName,
    headerName: headerName,
    width: width,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    type: "number",
    valueFormatter: (params) => `${params.value.toFixed(2)} TL`,
    ...rest,
  };
};

export const numberColumn = (fieldName, headerName, width, rest) => {
  return {
    field: fieldName,
    headerName: headerName,
    width: width,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    type: "number",
    filterable: false,
    valueFormatter: ({ value }) => `${value.toFixed()}`,
    ...rest,
  };
};

export const actionColumn = (rest) => {
  return {
    field: "action",
    headerName: "Ok",
    width: 60,
    headerClassName: "header",
    headerAlign: "center",
    align: "right",
    filterable: false,
    sortable: false,
    ...rest,
  };
};
