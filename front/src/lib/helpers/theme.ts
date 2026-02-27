import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: "Plus Jakarta Sans",
        fontSize: 16,
        button: {
            textTransform: "none",
        },
    },

    palette: {
        primary: {
          main: "#0F172A",
        },
    },

    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
            },
          },
        },
    },
});