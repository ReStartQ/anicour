import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import { Tooltip } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useMainView } from 'renderer/context/MainViewContext';

export default function ListViewToggle() {
  const mainView: any = useMainView();

  return (
    <ToggleButtonGroup
      value={mainView.view}
      exclusive
      aria-label="text alignment"
      sx={{ flexBasis: '60%' }}
    >
      <ToggleButton
        value={0}
        aria-label="centered"
        onClick={() => {
          mainView.setView(0);
          console.log(mainView.view);
        }}
      >
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton
        value={1}
        aria-label="left aligned"
        onClick={() => {
          mainView.setView(1);
          console.log(mainView.view);
        }}
        // sx={{ maxHeight: '48px', maxWidth: '48px' }}
      >
        <ViewCompactIcon fontSize="medium" />
      </ToggleButton>
      <ToggleButton
        value={2}
        aria-label="right aligned"
        // disabled
        onClick={() => {
          mainView.setView(2);
          console.log(mainView.view);
        }}
      >
        <ListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

/*
      <ToggleButton
        value={2}
        aria-label="right aligned"
        // disabled
        onClick={() => {
          mainView.setView(2);
          console.log(mainView.view);
        }}
        disabled
      >
        <FormatListBulletedIcon />
      </ToggleButton>
*/
