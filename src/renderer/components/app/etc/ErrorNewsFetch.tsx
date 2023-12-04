import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';

const ErrorNewsFetch = () => {
  const newsServiceType: any = useNewsServiceType();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100% - 120px)',
        width: '100%',
      }}
    >
      <Box display="flex" flexDirection="row">
        <Typography>
          Failed to fetch news from{' '}
          {
            newsServiceType.news ? 'MyAnimeList' : 'AnimeNewsNetwork' // true = myanimelist, false = animenewsnetwork
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorNewsFetch;
