import * as React from 'react';
import { Button } from '@mui/material';

export default function ResetLoginButton() {
  const handleClickOpen = () => {
    window.electron.ipcRenderer.sendMessage('resetLogin', ['ping']);
  };
  const client = '9413';

  const authLink = `https://anilist.co/api/v2/oauth/authorize?client_id={9413}&response_type=token`;

  return (
    <Button variant="contained" color="error" onClick={handleClickOpen}>
      Reset Login
    </Button>
  );
}
