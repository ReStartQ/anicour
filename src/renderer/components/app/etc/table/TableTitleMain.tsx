import { Box, Typography } from '@mui/material';
import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useTitle } from 'renderer/context/TitleContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useCategory } from 'renderer/context/CategoryContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import HtmlTooltip from '../CustomTooltip1';

const TableTitleMain = ({ row }: any) => {
  const myTitlePreference: any = useTitle();
  const myCategory: any = useCategory();
  const mySidebar: any = useSidebarButton();

  return (
    <Typography noWrap fontSize={12}>
      {row.mediaListEntry.notes !== null ? (
        <HtmlTooltip title={row.mediaListEntry.notes}>
          <MessageIcon fontSize="inherit" sx={{ mr: '5px' }} />
        </HtmlTooltip>
      ) : null}
      {(row.mediaListEntry.repeat > 0 ||
        row.mediaListEntry.completedAt.year !== null) &&
      myCategory.category !== 1 ? (
        <HtmlTooltip
          title={mySidebar.sidebar === 0 ? 'Rewatching' : 'Rereading'}
        >
          <RepeatIcon fontSize="inherit" sx={{ mr: '5px' }} />
        </HtmlTooltip>
      ) : null}
      {getTitle(myTitlePreference.title, row)}
    </Typography>
  );
};

export default TableTitleMain;
