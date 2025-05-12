import { Box, Tooltip, Typography } from '@mui/material';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import axios from 'axios';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useState } from 'react';
import { useAdvancedThemeSongs } from 'renderer/context/advanced/AdvancedThemeSongContext';
import { Button } from '@mui/joy';

export default function ThemeSongButton({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const { advancedThemeSongs, setAdvancedThemeSongs }: any =
    useAdvancedThemeSongs();
  const getData = async () => {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime/${myMediaAdvanced.advancedMedia.idMal}/themes`,
    );
    console.log(data);
    setAdvancedThemeSongs(data.data);
  };

  const handleOnClick = async () => {
    getData();
  };

  return (
    <Box>
      <Tooltip title="Theme Songs" onClick={handleOnClick}>
        <Button
          disabled={
            advancedThemeSongs.endings.length !== 0 &&
            advancedThemeSongs.openings.length !== 0
          }
        >
          <MusicVideoIcon />
          <Typography>Get Theme Songs</Typography>
        </Button>
      </Tooltip>
    </Box>
  );
}
