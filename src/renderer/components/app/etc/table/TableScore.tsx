import { Typography } from '@mui/material';
import React from 'react';

const TableScore = ({ row }: any) => {
  return (
    <Typography fontSize={12}>
      {row.mediaListEntry.score === 0 ? '' : row.mediaListEntry.score}
    </Typography>
  );
};

export default TableScore;
