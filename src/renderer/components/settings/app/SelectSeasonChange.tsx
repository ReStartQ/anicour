import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { seasonChangeAtom } from 'renderer/store';

function SelectSeasonChange() {
  const [seasonChange, setSeasonChange] = useAtom(seasonChangeAtom);

  const handleChange = (event: any) => {
    setSeasonChange(event.target.value as string);
    window.electron.store.set('seasonChange', event.target.value);
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'seasonChange',
      event.target.value,
    ]);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard" id="defaultLinkLabel">
          Season Change
        </InputLabel>
        <NativeSelect
          id="defaultSeasonChange"
          value={seasonChange}
          onChange={handleChange}
        >
          <option value="Early">Early (beginning of Dec/Mar/Jun/Sep)</option>
          <option value="Standard">
            Standard (beginning of Jan/Apr/July/Oct)
          </option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default SelectSeasonChange;
