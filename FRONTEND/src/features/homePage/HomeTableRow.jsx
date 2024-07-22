import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjeForm from "../../components/forms/ProjeForm";
import OdemeForm from "../../components/forms/OdemeForm";
import ModalIconButton from "../../components/modal/ModelIconButton";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/isletmeDb";
import { getChangedValues } from "../../utils/helper-functions";
import { dateFormat } from "../../utils/time-functions";
import { Fragment, useState } from "react";
import {
  Table,
  Typography,
  IconButton,
  TableBody,
  Box,
  TableRow,
  TableCell,
  Collapse,
  Snackbar,
  Alert,
  Divider,
  Modal,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "30vh",
  width: { sm: "55%", xs: "85%", lg: "30%" },
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function Item({ name }) {
  if (name == "Devam Ediyor") {
    return (
      <TableCell width="10%" sx={{ color: "success.main", fontWeight: 500 }}>
        {name}
      </TableCell>
    );
  } else if (
    name == "Durduruldu" ||
    name == "Başarısız Tamamlandı" ||
    name == "Bilgi Yok"
  ) {
    return (
      <TableCell width="10%" sx={{ color: "error.main", fontWeight: 500 }}>
        {name}
      </TableCell>
    );
  } else if (name == "Başarıyla Tamamlandı") {
    return (
      <TableCell width="10%" sx={{ color: "info.main", fontWeight: 500 }}>
        {name}
      </TableCell>
    );
  }
}

const HomeTableRow = ({ data, index, setSearchData }) => {
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

  const [openArrow, setOpenArrow] = useState(false);
  const [openEditProjeModal, setOpenEditProjeModal] = useState(false);
  const [initalOdemeData, setInitalOdemeData] = useState();
  const [openEditOdemeModal, setOpenEditOdemeModal] = useState(false);
  const [response, error, loading, axiosFetch, setResponse] = useAxios();
  const [openSnack, setOpenSnack] = useState(false);

  const totalPayment = odemeler
    .reduce((n, { tutar }) => n + tutar, 0)
    .toFixed(2);

  const projeInitialValues = {
    baslamaTarihi,
    tamamlanmaTarihi,
    takipTarihi,
    notlar,
    sure,
    program,
    izleyici,
    durum,
  };

  const updateOdeme = (editOdemeRecord, odemeId) => {
    const urlText = "/odemeguncelle/" + isletmeId + "/" + id + "/" + odemeId;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
      requestConfig: {
        data: editOdemeRecord,
      },
    });
  };

  const deleteOdeme = (isletmeId, projeId, odemeId) => {
    const urlText = "/odemesil/" + isletmeId + "/" + projeId + "/" + odemeId;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
    });
  };

  const updateProje = (editProjeRecord) => {
    const urlText = "/projeguncelle/" + isletmeId + "/" + id;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
      requestConfig: {
        data: editProjeRecord,
      },
    });
  };

  const deleteProje = (isletmeId, projeId) => {
    const urlText = "/projesil/" + isletmeId + "/" + projeId;
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: urlText,
    });
  };

  const projeEditSubmitHandler = (values) => {
    const editProjeRecord = getChangedValues(values, projeInitialValues);
    updateProje(editProjeRecord);
    setOpenEditProjeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: isletmeId,
    }));
    setOpenSnack(true);
  };

  const odemeEditSubmitHandler = (values) => {
    const editOdemeRecord = {
      id: values.id,
      karekod: values.karekod.toUpperCase(),
      tarih: values.tarih,
      tutar: values.tutar,
      durum: values.durum,
    };
    updateOdeme(editOdemeRecord, values.id);
    setOpenEditOdemeModal(false);
    setSearchData((prevFormData) => ({
      ...prevFormData,
      id: isletmeId,
    }));
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Fragment>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {response.message}
        </Alert>
      </Snackbar>

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" width="1%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenArrow(!openArrow)}
            color="primary"
          >
            {openArrow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="1%">
          {index + 1}
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
        <Item name={durum} />
        <TableCell
          align="left"
          width="10%"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          {`${totalPayment} TL`}
        </TableCell>
        <TableCell align="left" width="10%">
          {odemeler.length == 0 && (
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                deleteProje(isletmeId, id);
                setSearchData((prevFormData) => ({
                  ...prevFormData,
                  id: isletmeId,
                }));
                setOpenSnack(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <ModalIconButton
            height={{ md: "45vh" }}
            modalOpen={openEditProjeModal}
            setModalOpen={setOpenEditProjeModal}
            title={program}
          >
            <ProjeForm
              submitHandler={projeEditSubmitHandler}
              updateForm={1}
              initialData={projeInitialValues}
              buttonName="GÜNCELLE"
            />
          </ModalIconButton>
        </TableCell>
      </TableRow>
      {odemeler && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={openArrow} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="odemeler">
                  <TableBody>
                    {odemeler.map(
                      (
                        { id, karekod, projeId, tarih, tutar, destek, durum },
                        index
                      ) => (
                        <TableRow
                          key={id}
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
                              onClick={() => {
                                deleteOdeme(isletmeId, projeId, id);
                                setSearchData((prevFormData) => ({
                                  ...prevFormData,
                                  id: isletmeId,
                                }));
                                setOpenSnack(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>

                            <IconButton
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setOpenEditOdemeModal(true);
                                setInitalOdemeData({
                                  id,
                                  karekod,
                                  tarih,
                                  tutar,
                                  durum,
                                });
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <Box
                              sx={{
                                outline: 0,
                                border: "none",
                              }}
                            >
                              <Modal
                                open={openEditOdemeModal}
                                onClose={() => setOpenEditOdemeModal(false)}
                                sx={{
                                  "& .MuiBackdrop-root": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                                aria-labelledby="dataForm"
                                aria-describedby="dataForm-description"
                              >
                                <Box sx={modalStyle}>
                                  <Typography variant="h6">
                                    Ödeme Güncelle
                                  </Typography>
                                  <Divider sx={{ mb: 2 }} />
                                  <OdemeForm
                                    submitHandler={odemeEditSubmitHandler}
                                    updateForm={1}
                                    initialData={initalOdemeData}
                                    buttonName="GÜNCELLE"
                                  />
                                </Box>
                              </Modal>
                            </Box>
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
