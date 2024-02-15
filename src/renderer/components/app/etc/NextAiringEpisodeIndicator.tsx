import { Tooltip, Typography } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MediaProgress from './MediaProgress';

const NextAiringEpisodeIndicator = ({ props }: any) => {
  const normalise = (value: number) =>
    ((value - 0) * 100) /
    (props.episodes !== null ? props.episodes - 0 : 26 - 0);

  return (
    <Box display="flex" flexDirection="row">
      <Typography fontSize={12} fontWeight="bold">
        {props.type === 'ANIME' ? 'Episodes' : 'Chapters'}
      </Typography>
      <Tooltip
        title={
          props.nextAiringEpisode.episode === 0
            ? `${props.nextAiringEpisode.episode} episodes aired`
            : `${props.nextAiringEpisode.episode - 1} episodes aired`
        }
        arrow
        variant="outlined"
        color="primary"
        placement="top"
      >
        <IconButton
          size="small"
          sx={{
            padding: 0,
            ml:
              props.nextAiringEpisode.episode - 1 <=
              props.mediaListEntry.progress
                ? 0.5
                : 0.6,
            border:
              props.nextAiringEpisode.episode - 1 <=
              props.mediaListEntry.progress
                ? '2px solid deepskyblue'
                : null,
          }}
        >
          <InfoIcon
            sx={{
              fontSize: '14px',
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NextAiringEpisodeIndicator;
