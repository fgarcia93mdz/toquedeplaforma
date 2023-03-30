import { createTheme } from '@mui/material/styles';


const colors = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    instagram: {
      main: '#c333a1',
      contrastText: '#fff',
      
    },
    facebook: {
      main: '#1877f2',
    },
    twitter: {
      main: '#42a5f5'
    },
  },
});

export default colors;
