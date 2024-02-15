import { LinearProgress } from '@mui/material';
import React from 'react';

const MediaProgress = ({ progress, buffer }: any) => {
  // MIN = Minimum expected value
  // MAX = Maximum expected value
  // Function to normalise the values (MIN / MAX could be integrated)
  // const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <LinearProgress
      variant="buffer"
      value={progress}
      valueBuffer={buffer}
      color="info"
      sx={{
        border: '1px solid deepskyblue',
        width: '75%',
        height: '7px',
        '& .MuiLinearProgress-dashed': {
          animation: 'none',
          backgroundImage: 'none',
        },
      }}
    />
  );
};

export default MediaProgress;
