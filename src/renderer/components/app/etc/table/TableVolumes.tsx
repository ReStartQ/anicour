import { Typography } from '@mui/material';
import React from 'react';

const TableVolumes = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.volumes !== null ? row.volumes : '?'}
    </Typography>
  );
};

export default TableVolumes;
