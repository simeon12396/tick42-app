import { createMuiTheme } from "@material-ui/core/styles";

const MaterialUITheme = createMuiTheme({
  palette: {
    primary: {
      main: "#08518b",
    },
    secondary: {
      main: "#fff",
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
