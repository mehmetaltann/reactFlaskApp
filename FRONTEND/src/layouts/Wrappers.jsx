import { Box, Container } from "@mui/material";

export const DataTableWrapper = ({ children, tableHeight, sxProps }) => {
  return (
    <Box sx={{ height: tableHeight, width: "100%", ...sxProps }}>
      {children}
    </Box>
  );
};

export const PageWrapper = ({ children, conSx, ...rest }) => {
  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container sx={{ mt: 2, ...conSx }} {...rest}>
        {children}
      </Container>
    </Box>
  );
};