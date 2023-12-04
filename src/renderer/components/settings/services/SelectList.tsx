import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';

export default function SelectList() {
  const newsServiceType: any = useNewsServiceType();
  const handleChange = async (event: SelectChangeEvent) => {
    console.log('test');
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">List</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="MyAnimeList"
          label="News"
          onChange={handleChange}
        >
          <MenuItem value="MyAnimeList">MyAnimeList</MenuItem>
          <MenuItem value="AniList">AniList</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
