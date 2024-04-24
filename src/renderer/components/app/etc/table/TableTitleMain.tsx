import { Box, Typography } from '@mui/material';
import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import { useTitle } from 'renderer/context/TitleContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import HtmlTooltip from '../CustomTooltip1';

const TableTitleMain = ({ row }: any) => {
  const myTitlePreference: any = useTitle();

  return (
    <Typography noWrap fontSize={12}>
      {row.mediaListEntry.notes !== null ? (
        <HtmlTooltip title={row.mediaListEntry.notes}>
          <MessageIcon fontSize="inherit" sx={{ mr: '5px' }} />
        </HtmlTooltip>
      ) : null}
      {getTitle(myTitlePreference.title, row)}
    </Typography>
  );
};

export default TableTitleMain;
