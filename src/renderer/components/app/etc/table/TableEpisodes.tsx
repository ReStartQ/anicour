import { Typography } from '@mui/material';
import React from 'react';

const TableEpisodes = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.episodes !== null ? row.episodes : '?'}
    </Typography>
  );
};

export default TableEpisodes;
