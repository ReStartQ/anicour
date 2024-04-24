import { Typography } from '@mui/material';
import React from 'react';

const TableChapters = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.chapters !== null ? row.chapters : '?'}
    </Typography>
  );
};

export default TableChapters;
