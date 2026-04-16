import React from 'react';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function MediaDropdownOptions({ handleContextMenu }) {
  return (
    <IconButton
      size="small"
      sx={{ borderRadius: '5px', py: '3px' }}
      onClick={handleContextMenu}
    >
      <MoreVert />
    </IconButton>
  );
}
