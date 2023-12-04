import * as React from 'react';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };

export default function UsernameInput() {
  return (
    <Box sx={{ minWidth: 220 }}>
      <Input placeholder="Username" inputProps={ariaLabel} />
    </Box>
  );
}
