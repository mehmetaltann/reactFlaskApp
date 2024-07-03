import HomeTableRow from "./HomeTableRow";
import { Fragment, useContext, useState } from "react";
import { Card } from "@mui/material";
import { WorkContext } from "../../store/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

const HomeTableSection = () => {
  const [isletme] = useContext(WorkContext);

  /* TTablo sort işlemleri için*/
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");

  const createSortHandler = (property) => (event) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  return (
    <Fragment>
      {isletme && isletme.projeler.length !== 0 && (
        <Card sx={{ p: 1, mt: 1 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left" key="name">
                    <TableSortLabel
                      active={valueToOrderBy === "name"}
                      direction={
                        valueToOrderBy === "name" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("name")}
                    >
                      İsim
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" key="size">
                    <TableSortLabel
                      active={valueToOrderBy === "size"}
                      direction={
                        valueToOrderBy === "size" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("size")}
                    >
                      Başlama Tarihi
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">Süre</TableCell>
                  <TableCell align="left">Bitiş Tarihi</TableCell>
                  <TableCell align="left">Takip Tarihi</TableCell>
                  <TableCell align="left">Durum</TableCell>
                  <TableCell align="left">Toplam Ödeme</TableCell>
                  <TableCell align="left">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isletme.projeler.map((item, index) => (
                  <HomeTableRow data={item} key={index} pIndex={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Fragment>
  );
};

export default HomeTableSection;
