import Box from '@mui/material/Box';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { MainTableView } from 'renderer/functions/view/DataTableFunctions';
import 'renderer/styles/MainArea.scss';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import MainMediaTable from './tables/MainMediaTable';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorCredentials from '../etc/ErrorCredentials';
import ErrorAPI from '../etc/ErrorAPI';

const MainTabList = ({ props }: any) => {
  const myTitle: any = useTitle();
  const myFilter: any = useFilter();
  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();
  const mySidebar: any = useSidebarButton();
  const myCategory: any = useCategory();
  const mySort: any = useSort();

  const { isLoading, isError, error, data, refetch }: any = useMainMediaList(
    myUsername.AniListUsername,
    myToken.AniListToken,
  );

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
    return <ErrorAPI />;
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 110px)',
        width: '100%',
        userSelect: 'none',
        // overflowY: 'auto',
      }}
    >
      <MainMediaTable
        props={MainTableView(
          mySidebar.sidebar,
          myCategory.category,
          data,
          myFilter.filter,
          mySort.sort,
          myTitle.title,
        )}
      />
    </Box>
  );
};

export default MainTabList;
