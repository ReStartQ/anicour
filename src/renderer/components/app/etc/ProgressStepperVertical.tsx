import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

export default function ProgressStepperVertical({
  props,
  advancedInput,
  dispatchInput,
}: any) {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(props.mediaListEntry.progress);

  const handleNext = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  useEffect(() => {
    setActiveStep(props.mediaListEntry.progress);
  }, [props.mediaListEntry.progress]);

  return (
    <Box display="flex" flexDirection="column" sx={{ gridColumn: '1/2' }}>
      <Typography fontSize={12}>
        {props.type === 'ANIME' ? 'Episodes' : 'Chapters'}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ overflowX: 'auto' }}
      >
        <Typography fontSize={12}>
          {props.type === 'ANIME'
            ? `${activeStep} / ${
                props.episodes !== null ? props.episodes : '?'
              }`
            : `${activeStep} / ${
                props.chapters !== null ? props.chapters : '?'
              }`}
        </Typography>
        <Box display="flex" flexDirection="column">
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={
              props.type === 'ANIME'
                ? activeStep === props.episodes
                : activeStep === props.chapters
            }
            sx={{ m: 0, p: 0, minWidth: 0 }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ m: 0, p: 0, minWidth: 0 }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
