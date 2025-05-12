import * as React from 'react';
import { Button } from '@mui/material';

export default function ResetLoginButton() {
  const handleClickOpen = () => {
    window.electron.ipcRenderer.sendMessage('resetLogin', ['ping']);
  };

  return (
    <Button variant="contained" color="error" onClick={handleClickOpen}>
      Reset Login
    </Button>
  );
}
