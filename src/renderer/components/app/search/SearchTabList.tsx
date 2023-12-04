import Box from '@mui/material/Box';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import {
  MainTableView,
  SearchTableView,
} from 'renderer/functions/view/DataTableFunctions';
import 'renderer/styles/MainArea.scss';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAdult } from 'renderer/context/AdultContext';
import SearchMediaTable from './tables/SearchMediaTable';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorCredentials from '../etc/ErrorCredentials';
import ErrorAPI from '../etc/ErrorAPI';

const SearchTabList = ({ props }: any) => {
  const myTitle: any = useTitle();
  const myFilter: any = useFilter();
  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();
  const searchTerm: any = useSearchTerm();
  const mySidebar: any = useSidebarButton();
  const adult: any = useAdult();
  const myCategory: any = useCategory();
  const mySort: any = useSort();

  const { isLoading, isError, error, data, refetch, dataUpdatedAt }: any =
    useSearchQuery(searchTerm.SearchTerm, myToken.AniListToken, adult.adult);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError && error.response.status === 400) {
    return <ErrorCredentials />;
  }

  if (isError && error.response.status !== 400) {
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
      <SearchMediaTable
        props={SearchTableView(
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

export default SearchTabList;
