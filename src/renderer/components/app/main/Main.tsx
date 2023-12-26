import Box from '@mui/joy/Box';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { useEffect, useLayoutEffect } from 'react';
import { useCategory } from 'renderer/context/CategoryContext';
import { useCategoryLast } from 'renderer/context/CategoryLastContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import MainCategoryBar from './MainCategoryBar';
import MainTab from './MainTab';
import MainTabList from './MainTabList';
import MainTabCompact from './MainTabCompact';
import HistoryTab from '../history/HistoryTab';
import MainTabLi from './MainTabLi';

function MainTabView({ view }: any) {
  if (view === 0) {
    return (
      // 140
      <MainTab />
    );
  }
  if (view === 1) {
    return (
      // 140
      <MainTabCompact />
    );
  }
  if (view === 2) {
    return (
      // 140
      <MainTabLi />
    );
  }
  return <Box />;
}

const Main = ({ props }: any) => {
  const myCategory: any = useCategory();
  const myCategoryLast: any = useCategoryLast();
  const mySidebarValue: any = useSidebarButton();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const myTheme: any = useTheme();
  const myMainView: any = useMainView();

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
      setJoyMode('dark');
      setMaterialMode('dark');
    } else {
      setJoyMode('light');
      setMaterialMode('light');
    }
  }, [myTheme, setJoyMode, setMaterialMode]);

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
        <MainCategoryBar />
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
          <MainTabView view={myMainView.view} />
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
          <MainTabView view={myMainView.view} />
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
          <MainTabView view={myMainView.view} />
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
          <MainTabView view={myMainView.view} />
        </TabPanel>
        <TabPanel
          value={4}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <MainTabView view={myMainView.view} />
        </TabPanel>
        <TabPanel
          value={5}
          sx={{
            height: 'calc(100vh)',
            gridColumn: '1/3',
            gridRow: '2/3',
            padding: '10px',
          }}
        >
          <MainTabView view={myMainView.view} />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default Main;
