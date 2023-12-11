import Box from '@mui/material/Box';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { MainCategoryView } from 'renderer/functions/view/MainViewFunctions';
import CircularProgress from '@mui/joy/CircularProgress';
import 'renderer/styles/MainArea.scss';
import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMainView } from '../../../context/MainViewContext';
import ErrorAPI from '../etc/ErrorAPI';
import ErrorCredentials from '../etc/ErrorCredentials';
import LoadingMessage from '../etc/LoadingMessage';

const MainTab = memo(({ props }: any) => {
  const mainView: any = useMainView();
  const sidebarValue: any = useSidebarButton();
  const categoryValue: any = useCategory();
  const myFilter: any = useFilter();
  const mySort: any = useSort();
  const myTitle: any = useTitle();
  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();
  const { isLoading, isError, error, data, refetch }: any = useMainMediaList(
    myUsername.AniListUsername,
    myToken.AniListToken,
  );

  // console.log(isError);
  // console.log(error);
  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError && error.response !== undefined) {
    if (error.response.status === 400) return <ErrorCredentials />;
  }

  if (isError && error.response !== undefined) {
    if (error.response.status !== 400) return <ErrorAPI />;
  }

  if (isError && error.response === undefined) {
    console.log('error');
    return <ErrorAPI />;
  }

  return (
    <Box
      sx={{
        height: 'calc(100% - 100px)',
        width: '100%',
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns:
          mainView.view === 0
            ? 'repeat(auto-fill, 360px)' // first part is for grid columns
            : 'repeat(auto-fill, 140px)', // second part is for compact columns
        gridTemplateRows:
          mainView.view === 0
            ? 'repeat(auto-fill, 200px)' // first part is for grid rows
            : 'repeat(auto-fill, 200px)', // second part is for compact rows
        gridGap: '10px',
      }}
    >
      <MainCategoryView
        category={categoryValue.category}
        sidebar={sidebarValue.sidebar}
        mainView={mainView.view}
        filter={myFilter.filter}
        sort={mySort.sort}
        title={myTitle.title}
      />
    </Box>
  );
});

export default MainTab;
