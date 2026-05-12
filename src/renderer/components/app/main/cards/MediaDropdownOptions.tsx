import React from 'react';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function MediaDropdownOptions({ handleContextMenu }) {
  return (
    <IconButton
      size="small"
      sx={{ borderRadius: '3px', py: '3px', px: '1px' }}
      onClick={handleContextMenu}
    >
      <MoreVert />
    </IconButton>
  );
}
