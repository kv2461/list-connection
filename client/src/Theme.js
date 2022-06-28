import {createTheme} from '@mui/material/styles'
import './index.css';

const robotoFont = "'Roboto', sans-serif";
const acmeFont = "'Acme', sans-serif";
const playFont = "'Play', sans-serif";
const bebasNeueFont = "'Bebas Neue', cursive";


export const theme = createTheme({
  typography: {
    fontFamily: acmeFont,
    button: {
      textTransform: "none"
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  });

