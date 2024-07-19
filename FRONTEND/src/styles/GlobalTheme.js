import { createTheme } from "@mui/material";

export const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: "#0F67B1",
      light: "#3FA2F6"
    },
    secondary: {
      main: "#96C9F4",
      light: "#FAFFAF"
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
