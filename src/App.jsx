import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function ThemedApp() {
  const { state } = useApp();
  const { darkMode } = state;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#2196F3' },
          secondary: { main: '#9C27B0' },
          background: {
            default: darkMode ? '#0d1117' : '#F4F6F8',
            paper: darkMode ? '#161b22' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: '"DM Sans", "Roboto", sans-serif',
          h4: { fontWeight: 800 },
          h5: { fontWeight: 800 },
          h6: { fontWeight: 700 },
        },
        shape: { borderRadius: 10 },
        components: {
          MuiCard: {
            defaultProps: { elevation: 0 },
          },
          MuiButton: {
            styleOverrides: {
              root: { textTransform: 'none', fontWeight: 600 },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontWeight: 600 },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.3s' }}>
        <Navbar />
        <Dashboard />
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
}
