import GridViewIcon from '@mui/icons-material/GridView';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ListIcon from '@mui/icons-material/List';
import { Typography, styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useMainView } from 'renderer/context/MainViewContext';
import HtmlTooltip from '../etc/CustomTooltip1';

const TooltipCustom = styled(HtmlTooltip)(({ value }: { value: number }) => ({
  value,
}));

export default function ListViewToggle() {
  const mainView: any = useMainView();

  return (
    <ToggleButtonGroup
      value={mainView.view}
      exclusive
      aria-label="text alignment"
      sx={{ flexBasis: '60%' }}
    >
      <TooltipCustom
        title={
          <>
            <Typography color="inherit" fontSize="14px">
              Grid
            </Typography>
          </>
        }
        placement="top"
        value={0}
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
      </TooltipCustom>
      <TooltipCustom
        title={
          <>
            <Typography color="inherit" fontSize="14px">
              Compact
            </Typography>
          </>
        }
        placement="top"
        value={1}
      >
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
      </TooltipCustom>
      <TooltipCustom
        title={
          <>
            <Typography color="inherit" fontSize="14px">
              List
            </Typography>
          </>
        }
        placement="top"
        value={2}
      >
        <ToggleButton
          value={2}
          aria-label="right aligned"
          onClick={async () => {
            mainView.setView(2);
            console.log(mainView.view);
          }}
        >
          <ListIcon />
        </ToggleButton>
      </TooltipCustom>
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
