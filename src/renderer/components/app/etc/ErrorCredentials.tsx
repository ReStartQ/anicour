import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorCredentials = () => {
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
        <Typography>
          Please set the username and token in the settings menu.
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorCredentials;
