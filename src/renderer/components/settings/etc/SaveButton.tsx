import * as React from 'react';
import { Button } from '@mui/material';

export default function SaveButton() {
  const handleClickOpen = () => {
    window.electron.store.set('aniListUsername', 'ReStart');
    window.electron.store.set('aniListToken', 'test');
  };

  return (
    <Button variant="contained" onClick={handleClickOpen}>
      Save
    </Button>
  );
}
