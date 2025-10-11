import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { manhattanTheme } from './theme/theme';
import SupplyDetailsDashboard from './pages/SupplyDetailsDashboard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={manhattanTheme}>
        <CssBaseline />
        <SupplyDetailsDashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
