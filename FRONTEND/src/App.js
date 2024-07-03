import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { WorkContextProvider } from "./store/AppContext";

function App() {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <WorkContextProvider>
        <Rotalar />
      </WorkContextProvider>
    </ThemeProvider>
  );
}

export default App;
