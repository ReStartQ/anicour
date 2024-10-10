import { LinearProgress } from '@mui/material';
import React from 'react';

const MediaProgress = ({
  progress,
  buffer,
  progressRaw,
  episodes,
  chapters,
  volumes,
  mediaType,
  type,
}: any) => {
  // MIN = Minimum expected value
  // MAX = Maximum expected value
  // Function to normalise the values (MIN / MAX could be integrated)
  // const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
  function getLength(number: any) {
    if (number !== null) {
      return number.toString().length;
    }
    return 1;
  }

  const getWidth = (
    rawValue: any,
    ep: any,
    ch: any,
    vol: any,
    typeMedia: any,
    progressType: any,
  ) => {
    // eslint-disable-next-line prefer-const
    let counter = 0;
    if (progressType === 0) {
      if (typeMedia === 'ANIME') {
        counter += getLength(rawValue) + getLength(ep);
      } else {
        counter += getLength(rawValue) + getLength(ch);
      }
    }
    if (progressType === 1) {
      counter += getLength(rawValue) + getLength(vol);
    }
    switch (counter) {
      case 2:
        // g
        return '66%';
      case 3:
        // g
        return '71%';
      case 4:
        // g
        return '78%';
      case 5:
        // g
        return '85%';
      case 6:
        // g
        return '88%';
      case 7:
        // g
        return '92%';
      default: // 8 g
        return '95%';
    }
  };

  return (
    <LinearProgress
      variant="buffer"
      value={progress}
      valueBuffer={buffer}
      color="info"
      sx={{
        border: '1px solid deepskyblue',
        width: '100%',
        height: '6px',
        '& .MuiLinearProgress-dashed': {
          animation: 'none',
          backgroundImage: 'none',
        },
      }}
    />
  );
};

export default MediaProgress;
