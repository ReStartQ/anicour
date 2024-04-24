import { Typography } from '@mui/material';
import React from 'react';

const TableAverageScore = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.averageScore !== null ? `${row.averageScore}%` : '?'}
    </Typography>
  );
};

export default TableAverageScore;
