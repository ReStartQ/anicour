import React from 'react';
import { formatStatus } from 'renderer/functions/edit/formatInfo';
import getStatusColor from 'renderer/functions/StatusFunction';
import CircleIcon from '@mui/icons-material/Circle';
import HtmlTooltip from '../CustomTooltip1';

const TableStatus = ({ row }: any) => {
  return (
    <HtmlTooltip title={formatStatus(row.original.status)}>
      <CircleIcon
        fontSize="inherit"
        sx={{
          mt: '2px',
          ml: '10px',
          padding: '2px',
          color: getStatusColor(row.original.status),
        }}
      />
    </HtmlTooltip>
  );
};

export default TableStatus;
