import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTitle } from 'renderer/context/TitleContext';
import { NativeSelect } from '@mui/material';

export default function SelectLanguage() {
  const [age, setAge] = React.useState('');
  const titlePreference: any = useTitle();

  const handleChange = (event: any) => {
    titlePreference.setTitle(event.target.value as string);
    window.electron.store.set('titlePreference', event.target.value);
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'titlePreference',
      event.target.value,
    ]);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard" id="demo-simple-select-label">
          Title Language
        </InputLabel>
        <NativeSelect
          id="demo-simple-select"
          value={titlePreference.title}
          onChange={handleChange}
        >
          <option value="Romaji">Romaji</option>
          <option value="English">English</option>
          <option value="Native">Native</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
