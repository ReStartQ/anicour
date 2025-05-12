import { Button } from '@mui/material';

export default function TestButton() {
  return (
    <Button
      onClick={() => {
        console.log(window.electron.store.get('theme'));
        console.log(window.electron.store.get('aniListUsername'));
        console.log(window.electron.store.get('aniListToken'));
      }}
    >
      test
    </Button>
  );
}
