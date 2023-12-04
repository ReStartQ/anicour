import * as React from 'react';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };

export default function TokenInput() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Input placeholder="Token" inputProps={ariaLabel} />
    </Box>
  );
}
