import EditIcon from "@mui/icons-material/Edit";
import { Modal, Box, Typography, Divider, IconButton } from "@mui/material";
import { Fragment } from "react";

const ModalIconButton = ({
  children,
  title,
  height = { md: "70vh", xs: "80vh" },
  color = "primary",
  variant = "outlined",
  modalOpen,
  setModalOpen,
  size = "small",
}) => {
  const modalStyle = {
    position: "absolute",
    top: "40%",
    left: "50%",
    height: height,
    width: { sm: "70%", xs: "85%", md: "50%", lg: "45%", xl: "45%" },
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
        size={size}
        variant={variant}
        color={color}
        onClick={() => setModalOpen(true)}
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
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
          aria-labelledby="dataForm"
          aria-describedby="dataForm-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ mb: 2 }} />
            {children}
          </Box>
        </Modal>
      </Box>
    </Fragment>
  );
};

export default ModalIconButton;
