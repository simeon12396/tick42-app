import { createMuiTheme } from "@material-ui/core/styles";

const MaterialUITheme = createMuiTheme({
  palette: {
    primary: {
      main: "#08518b",
      dark: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#FF0000",
    },
    success: {
      main: "#008000",
    },
  },
  spacing: 10,
});

export default MaterialUITheme;
