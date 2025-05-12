import { Button } from '@mui/material';

export default function SubmitButton() {
  const handleClickOpen = () => {
    console.log('test');
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleClickOpen}
      href="https://anilist.co/api/v2/oauth/authorize?client_id=9413&response_type=token"
    >
      Login with AniList
    </Button>
  );
}
