import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import 'renderer/styles/MainArea.scss';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorCredentials from '../etc/ErrorCredentials';
import ErrorAPI from '../etc/ErrorAPI';
import SeasonTabList from './SeasonTabList';

const SeasonTabLi = ({ props }: any) => {
  const myTitle: any = useTitle();
  const myFilter: any = useFilter();
  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();
  const searchTerm: any = useSearchTerm();
  const mySidebar: any = useSidebarButton();
  const adult: any = useAdult();
  const myCategory: any = useCategory();
  const mySort: any = useSort();
  const seasonInput: any = useSeasonInput();
  const myUserName: any = useAniListUsername();

  const { isLoading, isError, error, data, refetch, dataUpdatedAt }: any =
    useSeasonsQuery(
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

  return <SeasonTabList />;
};

export default SeasonTabLi;
