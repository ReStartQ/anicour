import Box from '@mui/joy/Box';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import { useColorScheme } from '@mui/joy/styles';
import { useEffect, useLayoutEffect } from 'react';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useCategoryLast } from 'renderer/context/CategoryLastContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import { useAtom } from 'jotai';
import {
  seasonPrevAtom,
  sessionIdAtom,
  sessionSeasonIdAtom,
} from 'renderer/store';
import isOnline from 'is-online';
import SeasonCategoryBar from './SeasonCategoryBar';
import SeasonTab from './SeasonTab';
import SeasonTabList from './SeasonTabList';

function SeasonTabView({ view }: any) {
  if (view === 0) {
    return (
      // 140
      <SeasonTab />
    );
  }
  if (view === 1) {
    return (
      // 140
      <SeasonTab />
    );
  }

  if (view === 2) {
    return (
      // 140
      <SeasonTabList />
    );
  }

  return <Box />;
}

export default function SeasonMain({ listValue }: any) {
  const myCategory: any = useCategory();
  const myCategoryLast: any = useCategoryLast();
  const mySidebarValue: any = useSidebarButton();
  const { mode, setMode } = useColorScheme();
  const myTheme: any = useTheme();
  const myMainView: any = useMainView();
  const seasonInput: any = useSeasonInput();
  const myToken: any = useAniListToken();
  const myUserName: any = useAniListUsername();
  const adult: any = useAdult();
  const [seasonPrev, setSeasonPrev] = useAtom(seasonPrevAtom);
  const [sessionId, setSessionId] = useAtom(sessionIdAtom);
  const [sessionSeasonId, setSessionSeasonId] = useAtom(sessionSeasonIdAtom);

  const { data, refetch } = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

  useEffect(() => {
    const fetchSeason = async () => {
      let checkOnline = false;
      checkOnline = await isOnline();
      console.log(checkOnline);
      if (checkOnline) {
        await refetch();
      }
    };
    if (seasonInput.seasonInput !== seasonPrev) {
      setSeasonPrev(seasonInput.seasonInput);
      fetchSeason();
      console.log(seasonInput.seasonInput);
    }
    console.log(seasonInput.seasonInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, seasonInput.seasonInput]);

  useEffect(() => {
    const fetchSeason = async () => {
      let checkOnline = false;
      checkOnline = await isOnline();
      console.log(checkOnline);
      if (checkOnline) {
        await refetch();
      }
    };
    if (sessionId !== sessionSeasonId) {
      console.log('test');
      setSessionSeasonId(sessionId);
      fetchSeason();
    }
  }, [refetch, sessionId, sessionSeasonId, setSessionSeasonId]);

  useLayoutEffect(() => {
    // Update the document title using the browser API
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
          <SeasonCategoryBar />
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
          display="flex"
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
          <SeasonTabView view={myMainView.view} />
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
          <SeasonTabView view={myMainView.view} />
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
          <SeasonTabView view={myMainView.view} />
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
          <SeasonTabView view={myMainView.view} />
        </TabPanel>
      </Tabs>
    </Box>
  );
}
