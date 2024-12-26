import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { nextAiringEpisodeAtom } from 'renderer/store';

function NextAiringEpisodeMainList() {
  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  const handleChange = (event: any) => {
    setNextAiringEpisode(event.target.value as string);
    window.electron.store.set('nextAiringEpisode', event.target.value);
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'nextAiringEpisode',
      event.target.value,
    ]);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard">
          Next Airing Episode (Main List)
        </InputLabel>
        <NativeSelect
          id="defaultNextAiringEpisode"
          value={nextAiringEpisode}
          onChange={handleChange}
        >
          <option value="Show">Show</option>
          <option value="Hide">Hide</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default NextAiringEpisodeMainList;
