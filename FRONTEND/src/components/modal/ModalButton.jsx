import SendIcon from "@mui/icons-material/Send";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button, Modal, Box, Typography, Divider } from "@mui/material";
import { Fragment } from "react";

const ModalButton = ({
  children,
  minW = "25vh",
  maxW = "35vh",
  title,
  height = { md: "70vh", xs: "80vh" },
  color = "secondary",
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
    top: "40%",
    left: "50%",
    height: height,
    width: { md: "40%", sm: "55%", xs: "85%", lg: "30%" },
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
        endIcon={endIconLogo === "send" ? <SendIcon /> : <PlaylistAddIcon />}
        sx={{ minWidth: minW, maxWidth: maxW }}
        onClick={() => setModalOpen(true)}
      >
        {buttonTitle}
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="dataForm"
        aria-describedby="dataForm-description"
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
