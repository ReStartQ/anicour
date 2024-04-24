import { Typography } from '@mui/material';
import React from 'react';
import { formatType } from 'renderer/functions/edit/formatInfo';

const TableType = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.format !== null ? formatType(row.format) : '?'}
    </Typography>
  );
};

export default TableType;
