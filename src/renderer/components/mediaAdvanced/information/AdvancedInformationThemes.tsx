import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAdvancedThemeSongs } from 'renderer/context/advanced/AdvancedThemeSongContext';
import axios from 'axios';

const AdvancedInformationThemes = () => {
  const myMediaAdvanced: any = useAdvancedMedia();
  const { advancedThemeSongs, setAdvancedThemeSongs }: any =
    useAdvancedThemeSongs();

  const [fetchFlag, setFetchFlag] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    const { data, status } = await axios
      .get(
        `https://api.jikan.moe/v4/anime/${myMediaAdvanced.advancedMedia.idMal}/themes`,
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log('Error: failed to get theme songs');
        setFetchFlag(true);
        return err;
      });
    console.log(data);
    console.log(status);
    if (status === 200) {
      setAdvancedThemeSongs(data.data);
      setFetchFlag(true);
    } else {
      setError(data);
    }
  };

  useEffect(() => {
    if (
      advancedThemeSongs.openings.length === 0 &&
      advancedThemeSongs.endings.length === 0 &&
      fetchFlag === false
    ) {
      console.log('new data theme songs');
      getData();
    }
  });

  const openingList = advancedThemeSongs.openings.map((theme: any) => (
    <Typography fontSize={12} key={theme} className="information">
      {theme}
    </Typography>
  ));

  const endingList = advancedThemeSongs.endings.map((theme: any) => (
    <Typography fontSize={12} key={theme} className="information">
      {theme}
    </Typography>
  ));

  if (error !== null) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          pr: '10px',
        }}
      >
        <Typography fontSize={12} fontWeight="bold">
          Failed to get OP/ED theme songs
        </Typography>
      </Box>
    );
  }

  if (
    advancedThemeSongs.openings.length === 0 &&
    advancedThemeSongs.endings.length === 0 &&
    fetchFlag === true
  ) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          pr: '10px',
        }}
      >
        <Typography fontSize={12} fontWeight="bold">
          No OP/ED songs were found for this anime.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        pr: '10px',
      }}
    >
      {advancedThemeSongs.openings.length !== 0 ? (
        <Typography
          fontSize={12}
          fontWeight="bold"
          sx={{ textDecoration: 'underline' }}
          className="label-information"
        >
          Openings:
        </Typography>
      ) : null}
      {openingList}
      {advancedThemeSongs.endings.length !== 0 ? (
        <Typography
          fontSize={12}
          fontWeight="bold"
          sx={{ textDecoration: 'underline' }}
          className="label-information"
        >
          Endings:
        </Typography>
      ) : null}
      {endingList}
    </Box>
  );
};

export default AdvancedInformationThemes;
