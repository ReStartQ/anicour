import { IconButton } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useReducer } from 'react';
import { AdvancedInputContextReducer } from 'renderer/context/advanced/AdvancedInputContext';
import {
  formatProgress,
  formatProgressVolumes,
} from 'renderer/functions/edit/formatInfo';
import { useCategory } from 'renderer/context/CategoryContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useUpdateEntryData } from 'renderer/functions/api/mutations/updateEntry';
import HtmlTooltip from '../CustomTooltip1';

const TableProgressVolumeStepper = ({ row }: any) => {
  const [advancedInput, inputDispatch] = useReducer(
    AdvancedInputContextReducer,
    row.mediaListEntry,
  );

  const updateMutation: any = useUpdateEntryData();

  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const myCategory: any = useCategory();

  const handleUpdate = () => {
    const today = new Date();
    let completeFlag = false;
    let whichNull = 'none';
    if (row.type === 'ANIME') {
      console.log('anime update');
      if (advancedInput.progress === row.episodes) {
        completeFlag = true;
      }
    } else {
      console.log('manga update');
      if (
        advancedInput.progress === row.chapters ||
        advancedInput.progressVolumes === row.volumes
      ) {
        // only allows for check on if episodes is equal to null
        if (row.type !== 'ANIME') {
          if (row.chapters === null) {
            whichNull = 'chapters';
          }
          if (row.volumes === null) {
            whichNull = 'volumes';
          }
        }
        completeFlag = true;
      }
    }
    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: row.id,
      myStatus: row.mediaListEntry.status,
      // basically change progres, progressVolumes, and score
      advancedInput, // Local card reducer state
      advancedMedia: row,
      /*
      example
      {
        ...row.mediaListEntry,
        progress: 2,
        progressVolumes: row.type === 'ANIME' ? null : 0,
        score: 0,
      }
      */
    };

    const entryCompletedAnime: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: row.id,
      myStatus: 'COMPLETED',
      // basically change progres, progressVolumes, and score
      advancedInput: {
        ...advancedInput,
        progress: row.episodes,
        status: 'COMPLETED',
        completedAt:
          advancedInput.completedAt.year === null
            ? {
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
              }
            : {
                day: advancedInput.completedAt.day,
                month: advancedInput.completedAt.month,
                year: advancedInput.completedAt.year,
              },
        repeat:
          (advancedInput.completedAt.year !== null ||
            advancedInput.repeat !== 0) &&
          myCategory.category !== 1
            ? advancedInput.repeat + 1
            : advancedInput.repeat,
      }, // Local card reducer state
      advancedMedia: row,
    };

    const entryCompletedManga: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: row.id,
      myStatus: 'COMPLETED',
      // basically change progres, progressVolumes, and score
      advancedInput: {
        ...advancedInput,
        progress:
          whichNull !== 'chapters' ? row.chapters : advancedInput.progress,
        progressVolumes:
          whichNull !== 'volumes' ? row.volumes : advancedInput.progressVolumes,
        status: 'COMPLETED',
        completedAt:
          advancedInput.completedAt.year === null
            ? {
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
              }
            : {
                day: advancedInput.completedAt.day,
                month: advancedInput.completedAt.month,
                year: advancedInput.completedAt.year,
              },
        repeat:
          (advancedInput.completedAt.year !== null ||
            advancedInput.repeat !== 0) &&
          myCategory.category !== 1
            ? advancedInput.repeat + 1
            : advancedInput.repeat,
      }, // Local card reducer state
      advancedMedia: row,
    };

    if (completeFlag === true) {
      // complete
      console.log('complete');
      if (row.type === 'ANIME') {
        updateMutation.mutate(entryCompletedAnime);
      } else {
        updateMutation.mutate(entryCompletedManga);
      }
    } else {
      console.log('regular');
      // regular
      updateMutation.mutate(entry);
    }
    // setNotificationOpen(true);
  };

  const getVolumeNumber = (value: any, progress: any) => {
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
  };

  const normalise = (value: number) =>
    ((value - 0) * 100) /
    (row.volumes !== null
      ? row.volumes - 0
      : getVolumeNumber(row.volumes, advancedInput.progressVolumes) - 0);

  const handleNext = () => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: advancedInput.progressVolumes + 1,
    });
  };

  const handleBack = () => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: advancedInput.progressVolumes - 1,
    });
  };

  useEffect(() => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: row.mediaListEntry.progressVolumes,
    });
  }, [inputDispatch, row.mediaListEntry.progressVolumes]);

  return (
    <Box display="flex" flexDirection="row" width="100%" alignItems="center">
      <IconButton
        size="sm"
        variant="outlined"
        color="primary"
        disabled={advancedInput.progressVolumes === 0}
        onClick={handleBack}
        sx={{
          '&:hover': {
            backgroundColor: '#12467b',
          },
          p: 0,
          '--IconButton-size': '12px',
        }}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>
      <Typography
        fontSize={12}
        noWrap
        sx={{ flexGrow: 1, textAlign: 'center' }}
      >
        {formatProgressVolumes(advancedInput.progressVolumes, row.volumes)}
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="primary"
        onClick={handleNext}
        sx={{
          '&:hover': {
            backgroundColor: '#12467b',
          },
          p: 0,
          '--IconButton-size': '12px',
        }}
        disabled={
          advancedInput.progressVolumes === row.volumes ||
          advancedInput.progressVolumes === 9999
        }
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
      {row.mediaListEntry.progressVolumes === advancedInput.progressVolumes ? (
        <Box width="16px" ml={0.5} />
      ) : null}
      <HtmlTooltip title="Update">
        <IconButton
          size="sm"
          variant="outlined"
          color="primary"
          sx={{
            display:
              row.mediaListEntry.progressVolumes ===
              advancedInput.progressVolumes
                ? 'none'
                : null,
            '&:hover': {
              backgroundColor: '#12467b',
            },
            ml: 0.5,
            p: 0,
            '--IconButton-size': '12px',
          }}
          onClick={handleUpdate}
        >
          <SaveIcon fontSize="inherit" />
        </IconButton>
      </HtmlTooltip>
    </Box>
  );
};

export default TableProgressVolumeStepper;
