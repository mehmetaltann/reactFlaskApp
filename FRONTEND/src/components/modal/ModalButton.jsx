import SendIcon from "@mui/icons-material/Send";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { Button, Modal, Box, Typography, Divider } from "@mui/material";
import { Fragment } from "react";

const ModalButton = ({
  children,
  minW = "25vh",
  maxW = "35vh",
  maxh = "7vh",
  title,
  height = { md: "70vh", xs: "80vh" },
  color = "primary",
  endIconLogo = "send",
  buttonTitle = "EKLE",
  variant = "outlined",
  modalOpen,
  setModalOpen,
  icon,
  size = "small",
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: height,
    width: { xs: "85%", sm: "65%", md: "60%", lg: "40%", xl: "35%" },
    overflow: "auto",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  return (
    <Fragment>
      <Button
        color={color}
        size={size}
        variant={variant}
        startIcon={icon}
        endIcon={
          endIconLogo === "editnote" ? (
            <EditNoteIcon />
          ) : endIconLogo === "payment" ? (
            <PaymentsIcon />
          ) : endIconLogo === "project" ? (
            <AccountTreeIcon />
          ) : endIconLogo === "addnew" ? (
            <AddToQueueIcon />
          ) : (
            <SendIcon />
          )
        }
        sx={{
          minWidth: minW,
          maxWidth: maxW,
          maxHeight: maxh,
        }}
        onClick={() => setModalOpen(true)}
      >
        {buttonTitle}
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="dataForm2"
        aria-describedby="dataForm-description2"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ mb: 2 }} />
          {children}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ModalButton;
