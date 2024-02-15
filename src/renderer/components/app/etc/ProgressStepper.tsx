import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { formatProgress } from 'renderer/functions/edit/formatInfo';
import { Button, IconButton } from '@mui/joy';
import NextAiringEpisodeIndicator from './NextAiringEpisodeIndicator';
import MediaProgress from './MediaProgress';

export default function ProgressStepper({
  props,
  advancedInput,
  inputDispatch,
}: any) {
  const theme = useTheme();

  const getEpisodeOrChapterNumber = (
    value: any,
    valueC: any,
    type: any,
    progress: any,
  ) => {
    if (type === 'ANIME') {
      if (value === null) {
        const num = Math.ceil(progress / 13);
        if (progress >= 1000) {
          return 9999;
        }
        if (progress >= 100) {
          return 999;
        }
        if (progress === 0) {
          return 13;
        }
        return num * 13 + 1;
      }
      return value;
    }
    if (valueC === null) {
      const num = Math.ceil(progress / 26);
      if (progress >= 1000) {
        return 9999;
      }
      if (progress >= 100) {
        return 999;
      }
      if (progress === 0) {
        return 13;
      }
      return num * 26 + 1;
    }
    return valueC;
  };

  const getEpisodeOrChapterNumberBuffer = (
    value: any,
    valueC: any,
    type: any,
    progress: any,
    nextAiringEpisode: any,
  ) => {
    if (type === 'ANIME') {
      if (value === null) {
        const num = Math.ceil(progress / 13);
        if (nextAiringEpisode === null && value === null) {
          return 0;
        }
        if (progress >= 1000) {
          return 9999;
        }
        if (progress >= 100) {
          return 999;
        }
        if (progress === 0) {
          return 13;
        }
        return num * 13 + 1;
      }
      return value;
    }
    if (valueC === null) {
      const num = Math.ceil(progress / 26);
      if (progress >= 1000) {
        return 9999;
      }
      if (progress >= 100) {
        return 999;
      }
      if (progress === 0) {
        return 13;
      }
      return num * 26 + 1;
    }
    return valueC;
  };

  const normalise = (value: number, valueC: number, type: any) => {
    if (type === 'ANIME') {
      return (
        ((value - 0) * 100) /
        (props.episodes !== null
          ? props.episodes - 0
          : getEpisodeOrChapterNumber(
              props.episodes,
              props.chapters,
              props.type,
              advancedInput.progress,
            ) - 0)
      );
    }
    return (
      ((valueC - 0) * 100) /
      (props.chapters !== null
        ? props.chapters - 0
        : getEpisodeOrChapterNumber(
            props.episodes,
            props.chapters,
            props.type,
            advancedInput.progress,
          ) - 0)
    );
  };

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

  /* <NextAiringEpisodeIndicator props={props} /> */

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ gridColumn: '1/2' /* userSelect: 'none' */ }}
    >
      {props.nextAiringEpisode !== null ? (
        <Typography fontSize={12} fontWeight="bold">
          {props.type === 'ANIME' ? 'Episodes' : 'Chapters'}
          {/* <NextAiringEpisodeIndicator props={props} /> */}
        </Typography>
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
          size="sm"
          variant="outlined"
          color="primary"
          onClick={handleBack}
          disabled={advancedInput.progress === 0}
          sx={{
            m: 0,
            p: 0,
            minWidth: 0,
            '--IconButton-size': '12px',
            mr: '4px',
          }}
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
          size="sm"
          variant="outlined"
          color="primary"
          onClick={handleNext}
          disabled={
            (props.type === 'ANIME'
              ? advancedInput.progress === props.episodes
              : advancedInput.progress === props.chapters) ||
            advancedInput.progress === 9999
          }
          sx={{
            m: 0,
            p: 0,
            minWidth: 0,
            '--IconButton-size': '12px',
            ml: '4px',
          }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ overflowX: 'auto', my: '3px' }}
      >
        <MediaProgress
          progress={normalise(
            advancedInput.progress,
            advancedInput.progress,
            props.type,
          )}
          buffer={normalise(
            props.nextAiringEpisode !== null
              ? props.nextAiringEpisode.episode - 1
              : getEpisodeOrChapterNumberBuffer(
                  props.episodes,
                  props.chapters,
                  props.type,
                  advancedInput.progress,
                  props.nextAiringEpisode,
                ), // this should be episodes or if episodes is null, then default number
            props.chapters,
            props.type,
          )}
        />
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
