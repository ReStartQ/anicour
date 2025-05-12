import Box from '@mui/material/Box';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { SearchCategoryView } from 'renderer/functions/view/SearchViewFunctions';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorCredentials from '../etc/ErrorCredentials';
import ErrorAPI from '../etc/ErrorAPI';

export default function SearchTab({ props }: any) {
  const mainView: any = useMainView();
  const myFilter: any = useFilter();
  const searchTerm: any = useSearchTerm();
  const mySidebar: any = useSidebarButton();
  const myCategory: any = useCategory();
  const adult: any = useAdult();
  const mySort: any = useSort();
  const myTitle: any = useTitle();

  const myToken: any = useAniListToken();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, isError, error, data, refetch }: any = useSearchQuery(
    searchTerm.SearchTerm,
    myToken.AniListToken,
    adult.adult,
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
      <SearchCategoryView
        category={myCategory.category}
        sidebar={mySidebar.sidebar}
        mainView={mainView}
        data={data}
        filter={myFilter.filter}
        index={0}
        sort={mySort.sort}
        title={myTitle.title}
      />
    </Box>
  );
}
