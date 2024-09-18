import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import CustomAppBar from '../components/CustomAppBar';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;