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
      <Container
        maxWidth="false"
        sx={{ mt: 2, width: { xs: "100%", xl: "90%" }, ...conSx }}
        {...rest}
      >
        {children}
      </Container>
    </Box>
  );
};
