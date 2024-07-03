import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjeForm from "../../components/forms/ProjeForm";
import OdemeForm from "../../components/forms/OdemeForm";
import ModalIconButton from "../../components/modal/ModelIconButton";
import { Fragment, useState } from "react";
import {
  Table,
  IconButton,
  TableBody,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Collapse,
} from "@mui/material";

const HomeTableRow = ({ data, pIndex }) => {
  const {
    baslama_tarihi,
    durum,
    id,
    takip_tarihi,
    tamamlanma_tarihi,
    odemeler,
    sure,
    program_ismi,
    izleyici,
    notlar,
  } = data;

  const [open, setOpen] = useState(false);
  const [openEditProjeModal, setOpenEditProjeModal] = useState(false);
  const [openEditOdemeModal, setOpenEditOdemeModal] = useState(false);

  const totalPayment = odemeler
    .reduce((n, { tutar }) => n + tutar, 0)
    .toFixed(2);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" width="1%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="primary"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="1%">
          {pIndex + 1}
        </TableCell>
        <TableCell align="left" width="25%">
          {program_ismi}
        </TableCell>
        <TableCell align="left" width="10%">
          {baslama_tarihi}
        </TableCell>
        <TableCell align="left" width="5%">
          {sure}
        </TableCell>
        <TableCell align="left" width="10%">
          {tamamlanma_tarihi}
        </TableCell>
        <TableCell align="left" width="10%">
          {takip_tarihi}
        </TableCell>
        <TableCell align="left" width="10%">
          {durum}
        </TableCell>
        <TableCell
          align="left"
          width="10%"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          {`${totalPayment} TL`}
        </TableCell>
        <TableCell align="left" width="10%">
          <IconButton size="small" color="primary" onClick={{}}>
            <DeleteIcon />
          </IconButton>
          <ModalIconButton
            height={{ md: "25vh" }}
            modalOpen={openEditProjeModal}
            setModalOpen={setOpenEditProjeModal}
            title="Proje Güncelle"
            color="primary"
          >
            <ProjeForm />
          </ModalIconButton>
        </TableCell>
      </TableRow>
      {odemeler && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="odemeler">
                  <TableBody>
                    {odemeler.map(
                      (
                        { destek_ismi, karekod, tarih, tutar, durum },
                        index
                      ) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" width="1%">
                            {index + 1}
                          </TableCell>
                          <TableCell component="th" scope="row" width="20%">
                            {destek_ismi}
                          </TableCell>
                          <TableCell width="5%">{karekod}</TableCell>
                          <TableCell width="10%">{tarih}</TableCell>
                          <TableCell
                            sx={{ color: "primary.main", fontWeight: 500 }}
                            width="10%"
                          >{`${tutar.toFixed(2)} TL`}</TableCell>
                          <TableCell width="10%">{durum}</TableCell>
                          <TableCell align="left" width="10%">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={{}}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <ModalIconButton
                              height={{ md: "25vh" }}
                              modalOpen={openEditOdemeModal}
                              setModalOpen={setOpenEditOdemeModal}
                              title="Ödeme Güncelle"
                              color="primary"
                            >
                              <OdemeForm />
                            </ModalIconButton>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

export default HomeTableRow;
