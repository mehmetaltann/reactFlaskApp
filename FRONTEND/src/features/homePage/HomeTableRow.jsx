import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjeForm from "../../components/forms/ProjeForm";
import OdemeForm from "../../components/forms/OdemeForm";
import ModalIconButton from "../../components/modal/ModelIconButton";
import { dateFormat } from "../../utils/time-functions";
import { sektorData } from "../../utils/sektorData";
import { destekData } from "../../utils/destekData";
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
    id,
    isletmeId,
    baslamaTarihi,
    tamamlanmaTarihi,
    takipTarihi,
    notlar,
    sure,
    program,
    izleyici,
    durum,
    odemeler,
  } = data;

  const [open, setOpen] = useState(false);
  const [openEditProjeModal, setOpenEditProjeModal] = useState(false);
  const [openEditOdemeModal, setOpenEditOdemeModal] = useState(false);

  const totalPayment = odemeler
    .reduce((n, { tutar }) => n + tutar, 0)
    .toFixed(2);

  const projeEditSubmitHandler = (values) => {
    const editProjeRecord = {
      id: values.id,
      isletmeId: values.isletmeId,
      baslamaTarihi: values.baslamaTarihi,
      tamamlanmaTarihi: values.tamamlanmaTarihi,
      takipTarihi: values.takipTarihi,
      notlar: values.notlar,
      sure: values.sure,
      program: values.program,
      izleyici: values.izleyici,
      durum: values.durum,
      odemeler: values.odemeler,
    };

    setOpenEditProjeModal(false);
  };

  const odemeEditSubmitHandler = (values) => {
    const editOdemeRecord = {
      id: values.id,
      projeId: values.projeId,
      karekod: values.karekod,
      tarih: values.tarih,
      tutar: values.tutar,
      destek: values.destek,
      durum: values.durum,
    };

    setOpenEditOdemeModal(false);
  };

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
        <TableCell align="left" width="15%">
          {program}
        </TableCell>
        <TableCell
          align="left"
          width="8%"
          sx={{ color: "success.main", fontWeight: 500 }}
        >
          {dateFormat(baslamaTarihi)}
        </TableCell>
        <TableCell align="left" width="5%">
          {sure}
        </TableCell>
        <TableCell align="left" width="7%">
          {dateFormat(tamamlanmaTarihi)}
        </TableCell>
        <TableCell align="left" width="7%">
          {dateFormat(takipTarihi)}
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
            height={{ md: "35vh" }}
            modalOpen={openEditProjeModal}
            setModalOpen={setOpenEditProjeModal}
            title={program}
            color="primary"
          >
            <ProjeForm
              submitHandler={projeEditSubmitHandler}
              sektorData={sektorData}
              updateForm={1}
              initialData={{
                id,
                isletmeId,
                baslamaTarihi,
                tamamlanmaTarihi,
                takipTarihi,
                notlar,
                sure,
                program,
                izleyici,
                durum,
                odemeler,
              }}
            />
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
                        { id, projeId, karekod, tarih, tutar, destek, durum },
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
                            {destek}
                          </TableCell>
                          <TableCell width="5%">{karekod}</TableCell>
                          <TableCell width="10%">{dateFormat(tarih)}</TableCell>
                          <TableCell
                            sx={{ color: "primary.main", fontWeight: 500 }}
                            width="10%"
                          >{`${tutar.toFixed(2)} TL`}</TableCell>
                          {durum == "ÖDENDİ" && (
                            <TableCell
                              width="10%"
                              sx={{ color: "success.main", fontWeight: 500 }}
                            >
                              {durum}
                            </TableCell>
                          )}
                          {durum == "BEKLEMEDE" && (
                            <TableCell
                              width="10%"
                              sx={{ color: "error.main", fontWeight: 500 }}
                            >
                              {durum}
                            </TableCell>
                          )}
                          <TableCell align="left" width="10%">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={{}}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <ModalIconButton
                              height={{ md: "30vh" }}
                              modalOpen={openEditOdemeModal}
                              setModalOpen={setOpenEditOdemeModal}
                              title="Ödeme Güncelle"
                              color="primary"
                            >
                              <OdemeForm
                                submitHandler={odemeEditSubmitHandler}
                                destekData={destekData}
                                updateForm={1}
                                initialData={{
                                  id,
                                  projeId,
                                  karekod,
                                  tarih,
                                  tutar,
                                  destek,
                                  durum,
                                }}
                              />
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
