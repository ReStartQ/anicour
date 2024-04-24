import { Typography } from '@mui/material';
import React from 'react';
import {
  formatSeason,
  formatStartYear,
} from 'renderer/functions/edit/formatInfo';

const TableSeason = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {row.season !== null && row.seasonYear !== null
        ? formatSeason(row.season, row.seasonYear)
        : formatStartYear(row.startYear)}
    </Typography>
  );
};

export default TableSeason;
