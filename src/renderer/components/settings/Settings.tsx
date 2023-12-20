import * as React from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAtom } from 'jotai';
import { appVersionAtom } from 'renderer/store';
import { useTheme } from '../../context/ThemeContext';
import SettingsMain from './SettingsMain';
import { useSidebarButton } from '../../context/SidebarContext';

const drawerWidth = 200;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function SideIcons({ view }: any) {
  if (view === 0) {
    return <ManageAccountsIcon />;
  }
  if (view === 1) {
    return <SettingsApplicationsIcon />;
  }
  if (view === 2) {
    return <InfoIcon />;
  }
  if (view === 3) {
    return <PowerSettingsNewIcon />;
  }
  return <></>;
}

const getSettingTitle = (type: any, appVersion: any) => {
  switch (type) {
    case 0:
      return 'Services';
    case 1:
      return 'Application';
    case 2:
      return `About`;
    case 3:
      return 'Reset';
    default:
      return 'Settings';
  }
};
export default function Settings() {
  const myTheme: any = useTheme();

  const sidebarValue: any = useSidebarButton();
  const [appVersion, setAppVersion] = useAtom(appVersionAtom);

  return (
    <ThemeProvider theme={myTheme.theme ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {getSettingTitle(sidebarValue.sidebar, appVersion)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {['Services', 'Application', 'About', 'Reset'].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      console.log('settings tab changed');
                      sidebarValue.setSidebar(index);
                    }}
                    selected={sidebarValue.sidebar === index}
                    dense
                  >
                    <ListItemIcon>
                      <SideIcons view={index} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // p: 1,
            m: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'inline-block',
          }}
        >
          <Toolbar />
          <Toolbar
            sx={{
              '&': {
                // your root styles but with higher CSS specificity
                padding: 0,
              },
            }}
          >
            <SettingsMain />
          </Toolbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
