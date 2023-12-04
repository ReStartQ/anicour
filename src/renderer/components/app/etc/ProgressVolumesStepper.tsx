import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { formatProgressVolumes } from 'renderer/functions/edit/formatInfo';

export default function ProgressVolumesStepper({
  props,
  advancedInput,
  inputDispatch,
}: any) {
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
      payload: props.mediaListEntry.progressVolumes,
    });
  }, [inputDispatch, props.mediaListEntry.progressVolumes]);

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ gridColumn: '2/3' }}>
        <Typography fontSize={12} fontWeight="bold">
          Volumes:{' '}
        </Typography>
        <Box display="flex" flexDirection="row">
          <IconButton
            size="small"
            onClick={handleBack}
            disabled={advancedInput.progressVolumes === 0}
            sx={{ m: 0, p: 0, minWidth: 0 }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography fontSize={12}>
            {formatProgressVolumes(
              advancedInput.progressVolumes,
              props.volumes,
            )}
          </Typography>
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={
              advancedInput.progressVolumes === props.volumes ||
              advancedInput.progressVolumes === 9999
            }
            sx={{ m: 0, p: 0, minWidth: 0 }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
