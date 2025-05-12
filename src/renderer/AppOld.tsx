import {
  HashRouter as Router,
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
import { useEffect } from 'react';
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
import { Provider } from 'jotai';
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
import { AniListTokenContextProvider } from './context/services/AniListTokenContext';
import { AniListUsernameContextProvider } from './context/services/AniListUsernameContext';
import { AdvancedMediaContextProvider } from './context/advanced/AdvancedMediaContext';
import TrailerPage from './components/trailer/TrailerPage';
import { AdvancedInputContextProvider } from './context/advanced/AdvancedInputContext';
import { SortLastContextProvider } from './context/SortLastContext';
import { updateQueryClientLists } from './functions/data/update/updateQueryClientLists';
import { AdultContextProvider } from './context/AdultContext';
import NewsButtonsAdvanced from './components/app/news/NewsButtonsAdvanced';
import NewsButtons from './components/app/news/NewsButtons';
import { CategoryLastContextProvider } from './context/CategoryLastContext';
import {
  AdvancedDefaultLinkContextProvider,
  useAdvancedDefaultLink,
} from './context/advanced/AdvancedDefaultLinkContext';
import { AdvancedMoreInfoContextProvider } from './context/advanced/AdvancedMoreInfoContext';
import { AdvancedThemeSongsContextProvider } from './context/advanced/AdvancedThemeSongContext';
import { myStore } from './store';
import NewsPage from './components/app/news/NewsPage';

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
    return <NewsButtonsAdvanced />;
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
  /* if (view === 5 && newsType === false) {
    return <NewsTabANN listValue={view} />;
  } */
  return <></>;
}

const Hello = () => {
  const mySidebarValue: any = useSidebarButton();
  const myTheme: any = useTheme();
  const myTitle: any = useTitle();
  const newsAdv: any = useNewsAdv();
  const newsServiceType: any = useNewsServiceType();
  const advancedDefaultLink: any = useAdvancedDefaultLink();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Update the document title using the browser API\
    window.electron.ipcRenderer.on('updateMainFromAdvanced', (arg: any) => {
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update the document title using the browser API\
    window.electron.ipcRenderer.once('toggleTheme', (arg) => {
      // eslint-disable-next-line no-console
      myTheme.toggleTheme();
      console.log('toggle');
      console.log(arg);
      window.electron.store.set('theme', arg);
    });
  }, [myTheme, myTheme.theme]);

  useEffect(() => {
    // Update the document title using the browser API\
    window.electron.ipcRenderer.once('updateMainFromSettings', (arg: any) => {
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
          break;
        case 'newsChange':
          console.log('newsChange');
          break;
        case 'advancedDefaultLink':
          console.log('advancedDefaultLink');
          advancedDefaultLink.setAdvancedDefaultLink(arg[1]);
          break;
        default:
          console.log('test');
      }
    });
  }, [advancedDefaultLink, myTitle]);

  useEffect(() => {
    // Update the document title using the browser API\
    console.log('news changed');
    window.electron.ipcRenderer.once('changeNews', (arg) => {
      // eslint-disable-next-line no-console
      if (newsServiceType.news !== arg) {
        newsServiceType.toggleNews();
      }
    });
  }, [newsServiceType]);

  return (
    <ThemeProvider theme={myTheme.theme ? darkTheme : lightTheme}>
      <CssBaseline enableColorScheme />
      <Box className="hi" sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            display: 'flex',
            ml: `${drawerWidth}px`,
            boxSizing: 'border-box',
            background: '#2E3B55', // original #2E3B55
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box />
            <Search />
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
                ? '1px solid white'
                : '1px solid black',
            }}
          >
            <MaterialCssVarsProvider
              theme={{ [MATERIAL_THEME_ID]: materialTheme }}
            >
              <JoyCssVarsProvider theme={joyTheme}>
                <CssBaseline enableColorScheme />
                <CategoryView
                  view={mySidebarValue.sidebar}
                  newsAdv={newsAdv.news}
                />
              </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
          </Toolbar>
          <MaterialCssVarsProvider
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
          >
            <JoyCssVarsProvider theme={joyTheme}>
              <CssBaseline enableColorScheme />
              <OtherView
                view={mySidebarValue.sidebar}
                newsType={newsServiceType.news}
              />
            </JoyCssVarsProvider>
          </MaterialCssVarsProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const router = createHashRouter([
  {
    path: '/',
    element: <Hello />,
    // loader: rootLoader,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/media',
    element: <MediaAdvanced />,
  },
  {
    path: '/trailer',
    element: <TrailerPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
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
                                                                router={router}
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

/*
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Hello />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings />
          }
        />
        <Route
          path="/media"
          element={
            <MediaAdvanced />
          }
        />
        <Route
          path="/trailer"
          element={
            <TrailerPage />
          }
        />
        <Route
          path="/news"
          element={
            <NewsPage />
          }
        />
      </Routes>
    </Router>

*/
