import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { defaultSeasonSortAtom } from 'renderer/store';

function SelectDefaultSeasonsSort() {
  const [defaultSeasonSort, setDefaultSeasonSort] = useAtom(
    defaultSeasonSortAtom,
  );

  const handleChange = (event: any) => {
    setDefaultSeasonSort(Number(event.target.value));
    window.electron.store.set('defaultSeasonSort', Number(event.target.value));
    /*
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'defaultSeasonSort',
      event.target.value,
    ]);
    */
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard">Seasonal Sort</InputLabel>
        <NativeSelect
          id="defaultSeasonSort"
          value={defaultSeasonSort}
          onChange={handleChange}
        >
          <option value={1}>Next Airing Time</option>
          <option value={2}>Popularity</option>
          <option value={3}>Score</option>
          <option value={4}>Status</option>
          <option value={5}>Title</option>
          <option value={6}>Episodes</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default SelectDefaultSeasonsSort;
