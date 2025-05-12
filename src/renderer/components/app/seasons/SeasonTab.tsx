import Box from '@mui/material/Box';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import { SeasonCategoryView } from 'renderer/functions/view/SeasonViewFunctions';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorCredentials from '../etc/ErrorCredentials';
import ErrorAPI from '../etc/ErrorAPI';

export default function SeasonTab({ props }: any) {
  const mainView: any = useMainView();

  const myFilter: any = useFilter();
  const myCategory: any = useCategory();
  const mySidebar: any = useSidebarButton();
  const titlePreference: any = useTitle();
  const mySort: any = useSort();

  const seasonInput: any = useSeasonInput();
  const myToken: any = useAniListToken();
  const myUserName: any = useAniListUsername();
  const adult: any = useAdult();

  const { isLoading, isError, error, data, refetch }: any = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
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
            ? 'repeat(auto-fill, 360px)'
            : 'repeat(auto-fill, 140px)',
        gridTemplateRows:
          mainView.view === 0
            ? 'repeat(auto-fill, 200px)'
            : 'repeat(auto-fill, 200px)',
        gridGap: '10px',
      }}
    >
      <SeasonCategoryView
        category={myCategory.category}
        sidebar={mySidebar.sidebar}
        mainView={mainView}
        data={data}
        filter={myFilter.filter}
        sort={mySort.sort}
        title={titlePreference.title}
        index={0}
      />
    </Box>
  );
}
