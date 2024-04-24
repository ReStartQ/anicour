import { IconButton } from '@mui/joy';
import HistoryIcon from '@mui/icons-material/History';
import React from 'react';
import { useSidebarButton } from 'renderer/context/SidebarContext';

const HistoryButton = () => {
  const mySideBar: any = useSidebarButton();

  const onClick = () => {
    mySideBar.setSidebar(6);
  };

  return (
    <IconButton onClick={onClick}>
      <HistoryIcon color={mySideBar.sidebar === 6 ? 'info' : 'inherit'} />
    </IconButton>
  );
};

export default HistoryButton;
