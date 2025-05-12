import SettingsIcon from '@mui/icons-material/Settings';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import NewsRefresh from '../news/NewsRefresh';
import HtmlTooltip from '../etc/CustomTooltip1';

export default function FeatureButtonGroupNews() {
  /*
  useEffect(() => {
    if (myUsername.AniListUsername !== '' && myToken.AniListToken !== '') {
      fetchAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myUsername.AniListUsername, myToken.AniListToken]);
  */
  return (
    <ToggleButtonGroup
      exclusive
      aria-label="text alignment"
      sx={{ width: '100%', justifyContent: 'end' }}
    >
      <NewsRefresh />
      <HtmlTooltip
        title={
          <>
            <Typography color="inherit" fontSize="14px">
              Settings
            </Typography>
          </>
        }
        placement="top"
      >
        <ToggleButton
          value="left"
          aria-label="left aligned"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('settings', ['ping']);
          }}
        >
          <SettingsIcon />
        </ToggleButton>
      </HtmlTooltip>
    </ToggleButtonGroup>
  );
}
