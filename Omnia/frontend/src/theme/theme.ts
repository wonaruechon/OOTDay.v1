import { createTheme } from '@mui/material/styles';

export const manhattanTheme = createTheme({
  palette: {
    primary: {
      main: '#1B3A57',
      light: '#2E5073',
      dark: '#0D1F2F',
    },
    secondary: {
      main: '#1976D2',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#ED6C02',
    },
    success: {
      main: '#2E7D32',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: '34px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
  },
  spacing: 8,
});
