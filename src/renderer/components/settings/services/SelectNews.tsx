import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';

export default function SelectNews() {
  const newsServiceType: any = useNewsServiceType();
  const handleChange = async (event: SelectChangeEvent) => {
    await newsServiceType.toggleNews();
    if (event.target.value === 'MyAnimeList') {
      window.electron.ipcRenderer.sendMessage('changeNews', [true]);
    }
    if (event.target.value === 'AnimeNewsNetwork') {
      window.electron.ipcRenderer.sendMessage('changeNews', [false]);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">News</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="MyAnimeList"
          label="News"
          onChange={handleChange}
          value={newsServiceType.news ? 'MyAnimeList' : 'AnimeNewsNetwork'}
        >
          <MenuItem value="MyAnimeList">MyAnimeList</MenuItem>
          <MenuItem value="AnimeNewsNetwork">AnimeNewsNetwork</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
