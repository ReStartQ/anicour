import { Tooltip } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import { Box, IconButton, Typography } from '@mui/material';
import MediaProgress from './MediaProgress';

const NextAiringEpisodeIndicator = ({ props, progress }: any) => {
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
            ml: props.nextAiringEpisode.episode - 1 <= progress ? 0.6 : 0.8,
            my: '1px',
            border:
              props.nextAiringEpisode.episode - 1 <= progress
                ? '2px solid deepskyblue'
                : null,
          }}
        >
          <InfoIcon
            sx={{
              fontSize: '10px',
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NextAiringEpisodeIndicator;
