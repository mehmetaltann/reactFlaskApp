import { Snackbar, Alert } from "@mui/material";


const InfoBox = ({ resStatus, resMessage, error, setOpenSnack, openSnack }) => {

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleClose}>
      <Alert
        severity={resStatus === 200 ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {resMessage}
        {error}
      </Alert>
    </Snackbar>
  );
};

export default InfoBox;
