import HomeTableRow from "./HomeTableRow";
import { Fragment } from "react";
import { Card } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HomeTableSection = ({ isletme }) => {
  return (
    <Fragment>
      {isletme && isletme.projeler.length !== 0 && (
        <Card sx={{ p: 1, mt: 1 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="project table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left">Proje</TableCell>
                  <TableCell align="left">Başlama Tarihi</TableCell>
                  <TableCell align="left">Süre</TableCell>
                  <TableCell align="left">Bitiş Tarihi</TableCell>
                  <TableCell align="left">Takip Tarihi</TableCell>
                  <TableCell align="left">Durum</TableCell>
                  <TableCell align="left">Toplam Ödeme</TableCell>
                  <TableCell align="left">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isletme.projeler.toReversed().map((item, index) => (
                  <HomeTableRow data={item} key={index} index={index} />
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
