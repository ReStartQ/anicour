import { Tooltip, Typography } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import React from 'react';
import { Box, IconButton } from '@mui/material';

const NextAiringEpisodeIndicator = ({ props }: any) => {
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
