import { Typography } from '@mui/material';
import { formatReleaseDateNumbers } from 'renderer/functions/edit/formatInfo';

const TableReleased = ({ row }: any) => {
  return (
    <Typography fontSize={12} noWrap>
      {formatReleaseDateNumbers(row.startDay, row.startMonth, row.startYear)}
    </Typography>
  );
};

export default TableReleased;
