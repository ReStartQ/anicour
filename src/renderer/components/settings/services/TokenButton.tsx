import * as React from 'react';
import { Button } from '@mui/material';

export default function TokenButton() {
  const handleClickOpen = () => {
    console.log('test');
  };
  const authLink = `https://anilist.co/api/v2/oauth/authorize?client_id=9413&response_type=token`;

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleClickOpen}
      href={authLink}
      target="_blank"
    >
      Login with AniList
    </Button>
  );
}
