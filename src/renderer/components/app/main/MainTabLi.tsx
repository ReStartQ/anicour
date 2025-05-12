import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import 'renderer/styles/MainArea.scss';
import { useSort } from 'renderer/context/SortContext';
import { useTitle } from 'renderer/context/TitleContext';
import ErrorAPI from '../etc/ErrorAPI';
import ErrorCredentials from '../etc/ErrorCredentials';
import LoadingMessage from '../etc/LoadingMessage';
import MainTabList from './MainTabList';

const MainTabLi = ({ props }: any) => {
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

  return <MainTabList />;
};

export default MainTabLi;
