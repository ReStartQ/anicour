import Box from '@mui/joy/Box';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import { useColorScheme } from '@mui/joy/styles';
import { useEffect, useLayoutEffect } from 'react';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useCategoryLast } from 'renderer/context/CategoryLastContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useAtom } from 'jotai';
import {
  searchPrevAtom,
  sessionIdAtom,
  sessionSearchIdAtom,
  sessionSeasonIdAtom,
} from 'renderer/store';
import isOnline from 'is-online';
import SearchCategoryBar from './SearchCategoryBar';
import SearchTab from './SearchTab';
import SearchTabList from './SearchTabList';

function SearchTabView({ view }: any) {
  if (view === 0) {
    return (
      // 140
      <SearchTab />
    );
  }
  if (view === 1) {
    return (
      // 140
      <SearchTab />
    );
  }

  if (view === 2) {
    return (
      // 140
      <SearchTabList />
    );
  }

  return <Box />;
}

export default function SearchMain({ listValue }: any) {
  const myCategory: any = useCategory();
  const myCategoryLast: any = useCategoryLast();
  const mySidebarValue: any = useSidebarButton();
  const { mode, setMode } = useColorScheme();
  const myTheme: any = useTheme();
  const myMainView: any = useMainView();

  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();

  const [searchPrev, setSearchPrev] = useAtom(searchPrevAtom);
  const [sessionId, setSessionId] = useAtom(sessionIdAtom);
  const [sessionSearchId, setSessionSearchId] = useAtom(sessionSearchIdAtom);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, refetch } = useSearchQuery(
    searchTerm.SearchTerm,
    myToken.AniListToken,
    adult.adult,
  );

  useEffect(() => {
    const fetchSearch = async () => {
      let checkOnline = false;
      checkOnline = await isOnline();
      console.log(checkOnline);
      if (checkOnline) {
        await refetch();
      }
    };
    if (searchTerm.SearchTerm !== searchPrev) {
      setSearchPrev(searchTerm.SearchTerm);
      fetchSearch();
      console.log('refetching search');
    }
    console.log(searchTerm.SearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm.SearchTerm]);

  useEffect(() => {
    const fetchSearch = async () => {
      let checkOnline = false;
      checkOnline = await isOnline();
      console.log(checkOnline);
      if (checkOnline) {
        await refetch();
      }
    };
    if (sessionId !== sessionSearchId) {
      console.log('test');
      setSessionSearchId(sessionId);
      fetchSearch();
    }
  }, [refetch, sessionId, sessionSearchId, setSessionSearchId]);

  useLayoutEffect(() => {
    switch (mySidebarValue.sidebar) {
      case 0:
        console.log(myCategory.category);
        myCategory.setCategory(myCategoryLast.categoryLast.anime);
        break;
      case 1:
        console.log(myCategory.category);
        myCategory.setCategory(myCategoryLast.categoryLast.manga);
        break;
      case 2:
        console.log(myCategory.category);
        myCategory.setCategory(myCategoryLast.categoryLast.lightNovels);
        break;
      case 3:
        console.log(myCategory.category);
        myCategory.setCategory(myCategoryLast.categoryLast.search);
        break;
      case 4:
        console.log(myCategory.category);
        myCategory.setCategory(myCategoryLast.categoryLast.seasons);
        break;
      default:
        console.log('default');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySidebarValue]);

  useEffect(() => {
    if (myTheme.theme === true) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [myTheme, setMode]);

  return (
    <Box
      sx={{
        bgcolor: '#2E3B55',
        width: '100%',
      }}
    >
      <Tabs
        size="sm"
        aria-label="Pipeline"
        value={myCategory.category}
        onChange={(event, value) => {
          myCategory.setCategory(value);
          switch (mySidebarValue.sidebar) {
            case 0:
              myCategoryLast.dispatch({
                type: 'updateAnimeCategory',
                payload: value,
              });
              break;
            case 1:
              myCategoryLast.dispatch({
                type: 'updateMangaCategory',
                payload: value,
              });
              break;
            case 2:
              myCategoryLast.dispatch({
                type: 'updateLightNovelsCategory',
                payload: value,
              });
              break;
            case 3:
              myCategoryLast.dispatch({
                type: 'updateSearchCategory',
                payload: value,
              });
              break;
            case 4:
              myCategoryLast.dispatch({
                type: 'updateSeasonsCategory',
                payload: value,
              });
              break;
            default:
              console.log('default');
          }
        }}
        sx={{
          width: '100%',
          '--Tabs-gap': '0px',
          display: 'grid',
          gridTemplateColumns: '770px 1fr',
          gridTemplateRows: '50px 1fr',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gridColumn: '1/2',
            gridRow: '1/2',
          }}
        >
          <SearchCategoryBar />
          <Box
            sx={{
              width: '270px',
              borderBottom: myTheme.theme
                ? '1px solid #858585'
                : '1px solid black',
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: '2/3',
            gridRow: '1/2',
            borderBottom: myTheme.theme
              ? '1px solid #858585'
              : '1px solid black',
          }}
        />
        <TabPanel
          value={0}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <SearchTabView view={myMainView.view} />
        </TabPanel>
        <TabPanel
          value={1}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <SearchTabView view={myMainView.view} />
        </TabPanel>
        <TabPanel
          value={2}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <SearchTabView view={myMainView.view} />
        </TabPanel>
        <TabPanel
          value={3}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <SearchTabView view={myMainView.view} />
        </TabPanel>
      </Tabs>
    </Box>
  );
}
