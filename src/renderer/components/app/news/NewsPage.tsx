import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { SyntheticEvent, useEffect } from 'react';
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy/styles';
import {
  ThemeProvider,
  createTheme,
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
  useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import { useTheme } from 'renderer/context/ThemeContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import { updateQueryClientLists } from 'renderer/functions/data/update/updateQueryClientLists';
import { useAtom } from 'jotai';
import {
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
  statusAddSelectAtom,
} from 'renderer/store';
import { useQueryClient } from '@tanstack/react-query';
import { useAdult } from 'renderer/context/AdultContext';
import { useAdvancedDefaultLink } from 'renderer/context/advanced/AdvancedDefaultLinkContext';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import NewsAdvancedAnn from './NewsAdvancedAnn';
import NewsBar from './NewsBar';
import NewsAdvanced from './NewsAdvanced';

const materialTheme = materialExtendTheme({
  colorSchemes: {
    light: { palette: {} },
    dark: { palette: {} },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
const joyTheme = joyExtendTheme({
  colorSchemes: {
    light: { palette: {} },
    dark: { palette: {} },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const NewsPage = () => {
  const myTheme: any = useTheme();
  const newsService: any = useNewsServiceType();

  const mySidebarValue: any = useSidebarButton();
  const myTitle: any = useTitle();
  const newsAdv: any = useNewsAdv();
  const newsServiceType: any = useNewsServiceType();
  const advancedDefaultLink: any = useAdvancedDefaultLink();
  const { AniListUsername, setAniListUsername }: any = useAniListUsername();
  const { AniListToken, setAniListToken }: any = useAniListToken();
  const [defaultAddStatus, setDefaultAddStatus] = useAtom(statusAddSelectAtom);
  const adult: any = useAdult();
  const queryClient = useQueryClient();

  const [notificationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [notifcationOpen, setNotificationOpen] = useAtom(notificationOpenAtom);
  const [notifcationAltOpen, setNotificationAltOpen] = useAtom(
    notificationAltOpenAtom,
  );
  const [notifcationMediaNames, setNotificationMediaNames] = useAtom(
    notificationMediaNamesAtom,
  );

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  const handleCloseAlt = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationAltOpen(false);
  };

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'updateMainFromAdvanced',
      (arg: any) => {
        if (arg[2] === 'update') {
          console.log('update');
          console.log(arg);
          // use a function to set the query data (update on list)
          updateQueryClientLists(0, arg, queryClient);
        } else {
          console.log('add to list');
          console.log(arg);
          // use a function to set the query data (add to list)
          updateQueryClientLists(1, arg, queryClient);
        }
      },
    );
    return () => {
      removeEventListener();
    };
  }, [queryClient]);

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'toggleTheme',
      (arg) => {
        // eslint-disable-next-line no-console
        myTheme.toggleTheme();
        console.log('toggle');
        console.log(arg);
        window.electron.store.set('theme', arg);
      },
    );
    return () => {
      removeEventListener();
    };
  }, [myTheme, myTheme.theme]);

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'updateMainFromSettings',
      (arg: any) => {
        // eslint-disable-next-line no-console
        console.log('updateMainFromSettings');
        console.log(arg);
        switch (arg[0]) {
          case 'titlePreference':
            myTitle.setTitle(arg[1]);
            break;
          case 'listViewOrder':
            console.log('listView');
            break;
          case 'themeSettings':
            console.log('theme');
            break;
          case 'aniListUsernameToken':
            console.log('aniListUsernameToken');
            // arg[1] is username arg[2] is token
            setAniListUsername(arg[1]);
            setAniListToken(arg[2]);
            break;
          case 'newsChange':
            console.log('newsChange');
            break;
          case 'advancedDefaultLink':
            console.log('advancedDefaultLink');
            advancedDefaultLink.setAdvancedDefaultLink(arg[1]);
            break;
          case 'addStatus':
            setDefaultAddStatus(arg[1]);
            break;
          default:
            console.log('test');
        }
      },
    );
    return () => {
      removeEventListener();
    };
  }, [
    advancedDefaultLink,
    myTitle,
    setAniListToken,
    setAniListUsername,
    setDefaultAddStatus,
  ]);

  /*
  useEffect(() => {
    window.electron.ipcRenderer.on('adultFlag', (arg) => {
      // eslint-disable-next-line no-console
      adult.setAdult(arg);
      console.log('adult flag changed');
    });
  }, [adult]);
  */

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'changeNews',
      (arg) => {
        console.log('news changed');
        // eslint-disable-next-line no-console
        if (newsServiceType.news !== arg) {
          newsServiceType.toggleNews();
        }
      },
    );

    return () => {
      removeEventListener();
    };
  }, [newsServiceType]);

  return (
    <ThemeProvider theme={myTheme.theme ? darkTheme : lightTheme}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <CssBaseline enableColorScheme />
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <NewsBar />
            {newsService.news ? <NewsAdvanced /> : <NewsAdvancedAnn />}
          </Box>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

export default NewsPage;
