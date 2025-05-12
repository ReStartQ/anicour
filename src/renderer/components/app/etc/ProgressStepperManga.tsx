import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { formatProgress } from 'renderer/functions/edit/formatInfo';
import NextAiringEpisodeIndicator from './NextAiringEpisodeIndicator';
import MediaProgress from './MediaProgress';

export default function ProgressStepperManga({
  props,
  advancedInput,
  inputDispatch,
}: any) {
  const theme = useTheme();
  const normalise = (value: number) =>
    ((value - 0) * 100) /
    (props.episodes !== null ? props.episodes - 0 : 26 - 0);

  const handleNext = () => {
    inputDispatch({
      type: 'updateProgress',
      payload: advancedInput.progress + 1,
    });
  };

  const handleBack = () => {
    inputDispatch({
      type: 'updateProgress',
      payload: advancedInput.progress - 1,
    });
  };

  useEffect(() => {
    inputDispatch({
      type: 'updateProgress',
      payload: props.mediaListEntry.progress,
    });
  }, [inputDispatch, props.mediaListEntry.progress]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ gridColumn: '1/2' /* userSelect: 'none' */ }}
    >
      {props.nextAiringEpisode !== null ? (
        <NextAiringEpisodeIndicator props={props} />
      ) : (
        <Typography fontSize={12} fontWeight="bold">
          {props.type === 'ANIME' ? 'Episodes' : 'Chapters'}
        </Typography>
      )}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ overflowX: 'auto' }}
      >
        <IconButton
          size="small"
          onClick={handleBack}
          disabled={advancedInput.progress === 0}
          sx={{ m: 0, p: 0, minWidth: 0 }}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <Typography fontSize={12}>
          {formatProgress(
            props.type,
            advancedInput.progress,
            props.episodes,
            props.chapters,
          )}
        </Typography>
        <IconButton
          size="small"
          onClick={handleNext}
          disabled={
            (props.type === 'ANIME'
              ? advancedInput.progress === props.episodes
              : advancedInput.progress === props.chapters) ||
            advancedInput.progress === 9999
          }
          sx={{ m: 0, p: 0, minWidth: 0 }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}

/*
      {props.nextAiringEpisode !== null ? (
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
            placement="top"
          >
            <IconButton size="small" sx={{ padding: 0, ml: 0.5 }}>
              <InfoIcon
                sx={{
                  fontSize: '14px',
                  color:
                    props.nextAiringEpisode.episode - 1 <=
                    props.mediaListEntry.progress
                      ? '#4CBB17'
                      : 'white',

                    }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Typography fontSize={12} fontWeight="bold">
                {props.type === 'ANIME' ? 'Episodes' : 'Chapters'}
              </Typography>
            )}
*/
