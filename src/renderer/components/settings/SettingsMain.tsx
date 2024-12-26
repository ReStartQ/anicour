import { useState } from 'react';
import Box from '@mui/material/Box';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useFilter } from 'renderer/context/FilterContext';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useMainView } from '../../context/MainViewContext';
import SelectLanguage from './lang/SelectLanguage';
import ResetButton from './reset/ResetButton';
import AccountSection from './services/AccountSection';
import SelectDefaultLink from './app/SelectDefaultLink';
import DefaultStatus from './app/DefaultStatus';
import SelectDefaultView from './app/SelectDefaultView';
import AboutSection from './about/AboutSection';
import SelectSeasonChange from './app/SelectSeasonChange';
import NextAiringEpisodeMainList from './app/NextAiringEpisodeMainList';
import SelectDefaultSeasonsSort from './app/SelectDefaultSeasonsSort';
import CustomSettingsTooltip from './etc/CustomSettingsTooltip';

function SettingsMainTab({ view }: any) {
  if (view === 0) {
    return (
      <Box
        sx={{
          height: 'calc(100vh)',
          width: '100%',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box display="flex" flexDirection="row" gap="4px">
          <Typography variant="h6">AniList Account</Typography>
          <CustomSettingsTooltip
            title={
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  component="img"
                  src="https://github.com/ReStartQ/anicour/blob/main/images/help/AniListProfilePageTooltip.png?raw=true"
                  sx={{ width: '400px' }}
                />
                <Box
                  component="img"
                  src="https://github.com/ReStartQ/anicour/blob/main/images/help/AniListTokenTooltip.png?raw=true"
                  sx={{ width: '400px' }}
                />
              </Box>
            }
            placement="right"
          >
            <IconButton size="small">
              <HelpIcon fontSize="small" />
            </IconButton>
          </CustomSettingsTooltip>
        </Box>
        <AccountSection />
      </Box>
    );
  }
  if (view === 1) {
    return (
      <Box
        sx={{
          height: 'calc(100vh)',
          width: '100%',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Box display="flex" flexDirection="column" gap="16px">
          <Box>
            <Typography variant="h6" gutterBottom>
              Appearance
            </Typography>
            <Divider />
          </Box>
          <Grid container spacing={4}>
            <Grid item sm={4}>
              <SelectLanguage />
            </Grid>
            <Grid item sm={4}>
              <NextAiringEpisodeMainList />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box>
            <Typography variant="h6" gutterBottom>
              Behavior
            </Typography>
            <Divider />
          </Box>
          <Grid container spacing={4}>
            <Grid item sm={4}>
              <SelectDefaultView />
            </Grid>
            <Grid item sm={8}>
              <SelectSeasonChange />
            </Grid>
            <Grid item sm={4}>
              <SelectDefaultLink />
            </Grid>
            <Grid item sm={4}>
              <DefaultStatus />
            </Grid>
            <Grid item sm={4}>
              <SelectDefaultSeasonsSort />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
  if (view === 2) {
    return (
      <Box
        sx={{
          height: 'calc( 100vh )',
          width: '100%',
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <AboutSection />
      </Box>
    );
  }
  if (view === 3) {
    return (
      <Box
        sx={{
          height: 'calc(100vh)',
          width: '100%',
          position: 'relative',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        >
          <Typography variant="body1" gutterBottom>
            If you are having issues with the app, try resetting it to the
            default settings.
          </Typography>
        </Box>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translateY(-8%)', // Adjust this value to move the button up
          }}
        >
          <ResetButton />
        </Box>
      </Box>
    );
  }
  return <></>;
}

export default function SettingsMain({ props }: any) {
  const mainView: any = useMainView();
  const sidebarValue: any = useSidebarButton();
  const myFilter: any = useFilter();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(48);
  const [more, setMore] = useState(true);

  return <SettingsMainTab view={sidebarValue.sidebar} />;
}
