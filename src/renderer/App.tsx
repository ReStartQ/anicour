import {
  HashRouter as Router,
  Routes,
  Route,
  ScrollRestoration,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import './styles/App.scss';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import {
  ThemeProvider,
  createTheme,
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
  useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy/styles';
import { Provider, useAtom } from 'jotai';
import { Alert, Snackbar } from '@mui/material';
import {
  SidebarContextProvider,
  useSidebarButton,
} from './context/SidebarContext';
import { MainContextProvider } from './context/MainContext';
import { MainViewContextProvider } from './context/MainViewContext';
import { CategoryContextProvider } from './context/CategoryContext';
import Settings from './components/settings/Settings';
import { ThemeContextProvider, useTheme } from './context/ThemeContext';
import { FilterContextProvider } from './context/FilterContext';
import { SeasonContextProvider } from './context/SeasonsContext';
import { TitleContextProvider, useTitle } from './context/TitleContext';
import { SortContextProvider } from './context/SortContext';
import { SearchContextProvider } from './context/SearchContext';
import { SearchTermContextProvider } from './context/SearchTermContext';
import { NewsContextProvider } from './context/NewsContext';
import { NewsAdvContextProvider, useNewsAdv } from './context/NewsAdvContext';
import { NewsInfoContextProvider } from './context/NewsInfoContext';
import MediaAdvanced from './components/mediaAdvanced/MediaAdvanced';
import NewsTab from './components/app/news/NewsTab';
import SideBar from './components/app/sidebar/SideBar';
import Main from './components/app/main/Main';
import Search from './components/app/search/Search';
import {
  NewsServiceTypeContextProvider,
  useNewsServiceType,
} from './context/NewsServiceTypeContext';
import { NewsAnnContextProvider } from './context/NewsAnnContext';
import SearchMain from './components/app/search/SearchMain';
import SeasonMain from './components/app/seasons/SeasonMain';
import { SeasonInputContextProvider } from './context/SeasonInputContext';
import {
  AniListTokenContextProvider,
  useAniListToken,
} from './context/services/AniListTokenContext';
import {
  AniListUsernameContextProvider,
  useAniListUsername,
} from './context/services/AniListUsernameContext';
import { AdvancedMediaContextProvider } from './context/advanced/AdvancedMediaContext';
import TrailerPage from './components/trailer/TrailerPage';
import { AdvancedInputContextProvider } from './context/advanced/AdvancedInputContext';
import { SortLastContextProvider } from './context/SortLastContext';
import { updateQueryClientLists } from './functions/data/update/updateQueryClientLists';
import { AdultContextProvider, useAdult } from './context/AdultContext';
import NewsButtonsAdvanced from './components/app/news/NewsButtonsAdvanced';
import NewsButtons from './components/app/news/NewsButtons';
import { CategoryLastContextProvider } from './context/CategoryLastContext';
import {
  AdvancedDefaultLinkContextProvider,
  useAdvancedDefaultLink,
} from './context/advanced/AdvancedDefaultLinkContext';
import { AdvancedMoreInfoContextProvider } from './context/advanced/AdvancedMoreInfoContext';
import { AdvancedThemeSongsContextProvider } from './context/advanced/AdvancedThemeSongContext';
import {
  appResetDialogOpenAtom,
  myStore,
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
  seasonChangeAtom,
  statusAddSelectAtom,
} from './store';
import NewsPage from './components/app/news/NewsPage';
import NewsTabANN from './components/app/news/NewsTabANN';
import { getTitle } from './functions/view/TitlePreferenceFunctions';
import { getSnackbarType } from './functions/edit/componentTypes';
import FilterSelect from './components/app/search/FilterSelect';
import ResetMenuApp from './components/app/etc/ResetMenuApp';

declare module '@mui/joy/styles' {
  interface PaletteWarningOverrides {
    1000: true;
  }
}

const materialTheme = materialExtendTheme({
  colorSchemes: {
    light: {
      palette: {},
    },
    dark: {
      palette: {},
    },
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
    light: {
      palette: {},
    },
    dark: {
      palette: {
        primary: {
          '50': '#e1f5fe',
          '100': '#b3e5fc',
          '200': '#81d4fa',
          '300': '#4fc3f7',
          '400': '#29b6f6',
          '500': '#03a9f4',
          '600': '#039be5',
          '700': '#0288d1',
          '800': '#0277bd',
          '900': '#01579b',
        },
        success: {
          '50': '#ecfdf5',
          '100': '#d1fae5',
          '200': '#a7f3d0',
          '300': '#6ee7b7',
          '400': '#34d399',
          '500': '#10b981',
          '600': '#059669',
          '700': '#047857',
          '800': '#065f46',
          '900': '#064e3b',
        },
        warning: {
          '50': '#fffde7',
          '100': '#fff9c4',
          '200': '#fff59d',
          '300': '#fff176',
          '400': '#ffee58',
          '500': '#ffeb3b',
          '600': '#fdd835',
          '700': '#fbc02d',
          '800': '#f9a825',
          '900': '#f57f17',
        },
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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const drawerWidth = 240;

function CategoryView({ view, newsAdv }: any) {
  if (view === 0 || view === 1 || view === 2) {
    return <Main />;
  }
  if (view === 3) {
    // Search
    return <SearchMain />;
  }
  if (view === 4) {
    // Seasons
    return <SeasonMain />;
  }
  if (view === 5 && newsAdv === false) {
    return <NewsButtons />;
  }
  if (view === 5 && newsAdv === true) {
    return <NewsButtons />;
  }
  return <Box />;
}

function OtherView({ view, newsType }: any) {
  if (view === 5 && newsType === true) {
    return <NewsTab listValue={view} />;
  }
  /*
  if (view === 5 && newsType === false) {
    return <NewsTabANN listValue={view} />;
  }
  */
  return <></>;
}

const Hello = () => {
  const mySidebarValue: any = useSidebarButton();
  const myTheme: any = useTheme();
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
  const [seasonChange, setSeasonChange] = useAtom(seasonChangeAtom);
  const [openResetDialog, setOpenResetDialog] = useAtom(appResetDialogOpenAtom);

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
          case 'resetSettings':
            console.log('settings reset');
            // setOpenResetDialog(true);
            window.electron.store.clear();
            setAniListUsername('');
            setAniListToken('');
            myTitle.setTitle('Romaji');
            setDefaultAddStatus('CURRENT');
            setSeasonChange('Early');
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
    setOpenResetDialog,
    setSeasonChange,
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
          <Box className="hi" sx={{ display: 'flex' }}>
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
                    ? `Updated ${getTitle(
                        myTitle.title,
                        notifcationMediaNames,
                      )}`
                    : null}
                  {notificationType === 1
                    ? `Added ${getTitle(myTitle.title, notifcationMediaNames)}`
                    : null}
                  {notificationType === 2
                    ? `Removed ${getTitle(
                        myTitle.title,
                        notifcationMediaNames,
                      )}`
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
            <Box sx={{ width: 0, height: 0 }}>
              <ResetMenuApp />
            </Box>
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                display: 'flex',
                ml: `${drawerWidth}px`,
                boxSizing: 'border-box',
                background: '#2E3B55', // original #2E3B55 #102a43 #486581
              }}
            >
              <Toolbar
                variant="dense"
                disableGutters
                sx={{
                  width: '100%',
                  justifyContent: 'end',
                }}
              >
                <Search />
                <FilterSelect />
              </Toolbar>
              <Divider />
            </AppBar>
            <SideBar />
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
              <Toolbar variant="dense" />
              <Toolbar
                variant="dense"
                sx={{
                  '&': {
                    // your root styles but with higher CSS specificity
                    padding: 0,
                  },
                  height: mySidebarValue.sidebar === 5 ? '50px' : 'auto',
                  borderBottom: myTheme.theme
                    ? '1px solid #858585'
                    : '1px solid black',
                }}
              >
                <CssBaseline enableColorScheme />
                <CategoryView
                  view={mySidebarValue.sidebar}
                  newsAdv={newsAdv.news}
                />
              </Toolbar>
              <CssBaseline enableColorScheme />
              <OtherView
                view={mySidebarValue.sidebar}
                newsType={newsServiceType.news}
              />
            </Box>
          </Box>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

const hashRouter = createHashRouter([
  {
    path: '/',
    element: <Hello key={0} />,
    // loader: rootLoader,
  },
  {
    path: '/settings',
    element: <Settings key={1} />,
  },
  {
    path: '/media',
    element: <MediaAdvanced key={2} />,
  },
  {
    path: '/trailer',
    element: <TrailerPage key={3} />,
  },
  {
    path: 'news',
    element: <NewsPage key={4} />,
  },
]);

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <FilterContextProvider>
          <AdultContextProvider>
            <AniListTokenContextProvider>
              <AniListUsernameContextProvider>
                <SeasonContextProvider>
                  <SeasonInputContextProvider>
                    <MainContextProvider>
                      <MainViewContextProvider>
                        <SidebarContextProvider>
                          <CategoryContextProvider>
                            <CategoryLastContextProvider>
                              <TitleContextProvider>
                                <SortContextProvider>
                                  <SortLastContextProvider>
                                    <SearchTermContextProvider>
                                      <SearchContextProvider>
                                        <NewsServiceTypeContextProvider>
                                          <NewsAdvContextProvider>
                                            <NewsInfoContextProvider>
                                              <NewsAnnContextProvider>
                                                <NewsContextProvider>
                                                  <AdvancedMediaContextProvider>
                                                    <AdvancedInputContextProvider>
                                                      <AdvancedDefaultLinkContextProvider>
                                                        <AdvancedMoreInfoContextProvider>
                                                          <AdvancedThemeSongsContextProvider>
                                                            <Provider
                                                              store={myStore}
                                                            >
                                                              <RouterProvider
                                                                router={
                                                                  hashRouter
                                                                }
                                                                future={{
                                                                  v7_startTransition:
                                                                    true,
                                                                }}
                                                              />
                                                            </Provider>
                                                          </AdvancedThemeSongsContextProvider>
                                                        </AdvancedMoreInfoContextProvider>
                                                      </AdvancedDefaultLinkContextProvider>
                                                    </AdvancedInputContextProvider>
                                                  </AdvancedMediaContextProvider>
                                                </NewsContextProvider>
                                              </NewsAnnContextProvider>
                                            </NewsInfoContextProvider>
                                          </NewsAdvContextProvider>
                                        </NewsServiceTypeContextProvider>
                                      </SearchContextProvider>
                                    </SearchTermContextProvider>
                                  </SortLastContextProvider>
                                </SortContextProvider>
                              </TitleContextProvider>
                            </CategoryLastContextProvider>
                          </CategoryContextProvider>
                        </SidebarContextProvider>
                      </MainViewContextProvider>
                    </MainContextProvider>
                  </SeasonInputContextProvider>
                </SeasonContextProvider>
              </AniListUsernameContextProvider>
            </AniListTokenContextProvider>
          </AdultContextProvider>
        </FilterContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
