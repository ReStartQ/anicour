import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
