import EditIcon from "@mui/icons-material/Edit";
import { Modal, Box, Typography, Divider, IconButton } from "@mui/material";
import { Fragment } from "react";

const ModalIconButton = ({
  children,
  title,
  height = { md: "70vh", xs: "80vh" },
  color = "secondary",
  variant = "outlined",
  modalOpen,
  setModalOpen,
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
      <IconButton
        size="small"
        variant={variant}
        color={color}
        onClick={() => setModalOpen(true)}
      >
        <EditIcon />
      </IconButton>
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

export default ModalIconButton;
