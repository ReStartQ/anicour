import React from 'react';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Button } from '@mui/joy';

export default function MediaDropdownOptions({ handleContextMenu }) {
  return (
    <Button
      size="sm"
      sx={{
        borderRadius: '5px',
        px: '0px',
        py: '0px',
        height: '26px',
        minHeight: '26px',
        ml: '6px',
        '&:hover': {
          backgroundColor: '#1B3A57',
          animation: 'none',
        },
      }}
      variant="outlined"
      onClick={handleContextMenu}
    >
      <MoreVert />
    </Button>
  );
}
