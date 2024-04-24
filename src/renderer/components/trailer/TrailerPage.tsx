import { Box, CssBaseline, Paper } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  ThemeProvider,
  createTheme,
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
  useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy/styles';
import { blue, green, grey, purple, red, yellow } from '@mui/material/colors';
import { deepmerge } from '@mui/utils';
import 'renderer/styles/Trailer.scss';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAtom, useSetAtom } from 'jotai';
import {
  infoTypeAtom,
  isValidCompleteDateAtom,
  isValidStartDateAtom,
} from 'renderer/store';
import { useAdvancedThemeSongs } from 'renderer/context/advanced/AdvancedThemeSongContext';
import { useAdvancedMoreInfo } from 'renderer/context/advanced/AdvancedMoreInfoContext';
import TrailerAvailablePage from './TrailerAvailablePage';
import TrailerNotAvailablePage from './TrailerNotAvailablePage';

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

export default function TrailerPage({ props }: any) {
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

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'toggleTheme',
      (arg) => {
        // eslint-disable-next-line no-console
        console.log('toggle');
        console.log(arg);
        console.log(myTheme);
      },
    );

    return () => {
      removeEventListener();
    };
  }, [myTheme]);

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'advancedMedia',
      (arg: any) => {
        if (arg.length === 4) {
          console.log('same id');
          if (arg[1].id === myAdvancedMedia.advancedMedia.id)
            myAdvancedInput.dispatch({
              type: 'getMediaListEntry',
              payload: arg[3],
            });
        } else {
          // eslint-disable-next-line no-console
          console.log(arg);
          switch (arg[1]) {
            default:
              console.log(arg[1]);
          }
          myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: arg[1] });

          myAdvancedInput.dispatch({
            type: 'getMediaListEntry',
            payload: arg[1].mediaListEntry,
          });

          if (arg.length !== 3) {
            setInfoType(0);
            setIsValidStartDate(true);
            setIsValidCompleteDate(true);
            advancedMoreInfo.setAdvancedMoreInfo(false);
            setAdvancedThemeSongs({
              openings: [],
              endings: [],
            });
            setInfoType(0);
            // navigate('/media');
          }
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
          <Paper
            elevation={0}
            square
            sx={{
              height: 'calc( 100vh )',
              width: '100%',
              overflowY: 'auto',
              display: 'grid',
            }}
          >
            {myAdvancedMedia.advancedMedia.trailer !== null ? (
              <TrailerAvailablePage />
            ) : (
              <TrailerNotAvailablePage />
            )}
          </Paper>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
}
// check if trailer is null + on youtube
