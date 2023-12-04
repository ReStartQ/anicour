import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorAPI = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100% - 100px)',
        width: '100%',
      }}
    >
      <Box display="flex" flexDirection="row">
        <Typography>Failed to fetch data from the API service</Typography>
      </Box>
    </Box>
  );
};

export default ErrorAPI;
