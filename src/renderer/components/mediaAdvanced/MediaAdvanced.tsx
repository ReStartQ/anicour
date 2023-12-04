import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from '@mui/joy/styles';
import { Alert, Box, CssBaseline, Snackbar } from '@mui/material';
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  ThemeProvider,
  createTheme,
  experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles';
import { SyntheticEvent, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import 'renderer/styles/MediaAdvanced.scss';
import { useAdvancedMoreInfo } from 'renderer/context/advanced/AdvancedMoreInfoContext';
import { useAdvancedThemeSongs } from 'renderer/context/advanced/AdvancedThemeSongContext';
import {
  infoTypeAtom,
  isValidCompleteDateAtom,
  isValidStartDateAtom,
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
} from 'renderer/store';
import { useAtom, useSetAtom } from 'jotai';
import { getSnackbarType } from 'renderer/functions/edit/componentTypes';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedMedia } from '../../context/advanced/AdvancedMediaContext';
import AdvancedMain from './AdvancedMain';
import AdvancedMainNOL from './AdvancedMainNOL';

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
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
    },
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

export default function MediaAdvancedView() {
  const myTheme: any = useTheme();
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();
  const advancedMoreInfo: any = useAdvancedMoreInfo();
  const { advancedThemeSongs, setAdvancedThemeSongs }: any =
    useAdvancedThemeSongs();
  const navigate = useNavigate();
  const setInfoType = useSetAtom(infoTypeAtom);

  const [isValidCompleteDate, setIsValidCompleteDate] = useAtom(
    isValidCompleteDateAtom,
  );

  const [isValidStartDate, setIsValidStartDate] = useAtom(isValidStartDateAtom);

  const myTitle: any = useTitle();
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
      'toggleTheme',
      (arg) => {
        // eslint-disable-next-line no-console
        console.log('toggle');
        console.log(arg);
        console.log(myTheme.theme);
      },
    );

    return () => {
      removeEventListener();
    };
  }, [myTheme]);

  useLayoutEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'advancedMedia',
      (arg: any) => {
        // eslint-disable-next-line no-console
        console.log(arg);
        if (
          arg[1].id === myAdvancedMedia.advancedMedia.id &&
          arg.length === 4
        ) {
          console.log('same id');
          console.log(arg[3]);
          myAdvancedInput.dispatch({
            type: 'getMediaListEntry',
            payload: arg[3],
          });
        }
        if (arg.length <= 3) {
          switch (arg[1]) {
            default:
              console.log(arg[1].id);
          }

          setIsValidStartDate(true);
          setIsValidCompleteDate(true);
          myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: arg[1] });

          myAdvancedInput.dispatch({
            type: 'getMediaListEntry',
            payload: arg[1].mediaListEntry,
          });

          if (arg.length === 3) {
            navigate('/trailer');
          }

          console.log(
            `this is the state of more info ${advancedMoreInfo.advancedMoreInfo}`,
          );
          advancedMoreInfo.setAdvancedMoreInfo(false);
          setAdvancedThemeSongs({
            openings: [],
            endings: [],
          });
          setInfoType(0);
        }
      },
    );

    return () => {
      removeEventListener();
    };
  }, [
    advancedMoreInfo,
    myAdvancedInput,
    myAdvancedMedia,
    navigate,
    setAdvancedThemeSongs,
    setInfoType,
    setIsValidCompleteDate,
    setIsValidStartDate,
  ]);

  return (
    <ThemeProvider theme={myTheme.theme ? darkTheme : lightTheme}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <CssBaseline enableColorScheme />
          <Box sx={{ width: 0, height: 0 }}>
            <Snackbar
              open={notifcationOpen}
              autoHideDuration={2000}
              disableWindowBlurListener
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              key={`bottom-horizontal-${notificationType}-${getTitle(
                myTitle.title,
                notifcationMediaNames,
              )}`}
            >
              <Alert
                onClose={handleClose}
                severity={getSnackbarType(notificationType)}
                sx={{ width: '100%' }}
              >
                {notificationType === 0
                  ? `Updated ${getTitle(myTitle.title, notifcationMediaNames)}`
                  : null}
                {notificationType === 1
                  ? `Added ${getTitle(myTitle.title, notifcationMediaNames)}`
                  : null}
                {notificationType === 2
                  ? `Removed ${getTitle(myTitle.title, notifcationMediaNames)}`
                  : null}
              </Alert>
            </Snackbar>
          </Box>
          <Box sx={{ width: 0, height: 0 }}>
            <Snackbar
              open={notifcationAltOpen}
              autoHideDuration={2000}
              disableWindowBlurListener
              onClose={handleCloseAlt}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              key={`bottom-horizontal2-${notificationType}-${getTitle(
                myTitle.title,
                notifcationMediaNames,
              )}`}
            >
              <Alert
                onClose={handleCloseAlt}
                severity="error"
                sx={{ width: '100%' }}
              >
                Error: Failed to reach API
              </Alert>
            </Snackbar>
          </Box>
          {myAdvancedInput.advancedInput !== null ? (
            <AdvancedMain />
          ) : (
            <AdvancedMainNOL />
          )}
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
}
