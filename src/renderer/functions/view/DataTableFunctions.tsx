import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { filterTypeAtom, nextAiringEpisodeAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import { useMainMediaList } from '../MainMediaListFunctions';
import { getFilteredTabData, isFilteredTermOnList } from './FilterFunctions';
import { sortMyListAnime, sortMyListManga } from '../sort/sortMainFunctions';
import sortMySearch from '../sort/sortSearchFunctions';
import sortSeasons from '../sort/sortSeasonsFunctions';

export function getFunction() {
  console.log('test');
}

export function getProgressOutOfTotal(
  progress: any,
  total: any,
  mediaType: any,
  progressType: any,
) {
  if (total === null) {
    return '?';
  }
  return '?';
}

export const MainTableView = (
  sidebar: any,
  category: any,
  data: any,
  filter: any,
  sort: any,
  title: any,
) => {
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  if (filter !== '' && sidebar === 0) {
    return sortMyListAnime(
      sort,
      title,
      getFilteredTabData(category, sidebar, data),
      nextAiringEpisode,
    ).filter((media: any) => {
      return isFilteredTermOnList(media, filter, filterType);
    });
  }
  if (filter !== '' && sidebar === 1) {
    return sortMyListManga(
      sort,
      title,
      getFilteredTabData(category, sidebar, data),
    ).filter((media: any) => {
      return isFilteredTermOnList(media, filter, filterType);
    });
  }
  if (filter !== '' && sidebar === 2) {
    return sortMyListManga(
      sort,
      title,
      getFilteredTabData(category, sidebar, data),
    ).filter((media: any) => {
      return isFilteredTermOnList(media, filter, filterType);
    });
  }
  if (sidebar === 0 && category === 0) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animeWatching,
      nextAiringEpisode,
    );
  }
  if (sidebar === 0 && category === 1) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animeCompleted,
      nextAiringEpisode,
    );
  }
  if (sidebar === 0 && category === 2) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animeOnHold,
      nextAiringEpisode,
    );
  }
  if (sidebar === 0 && category === 3) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animeDropped,
      nextAiringEpisode,
    );
  }
  if (sidebar === 0 && category === 4) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animePlanToWatch,
      nextAiringEpisode,
    );
  }
  if (sidebar === 0 && category === 5) {
    return sortMyListAnime(
      sort,
      title,
      data?.anime.animeAll,
      nextAiringEpisode,
    );
  }
  if (sidebar === 1 && category === 0) {
    return sortMyListManga(sort, title, data?.manga.mangaReading);
  }
  if (sidebar === 1 && category === 1) {
    return sortMyListManga(sort, title, data?.manga.mangaCompleted);
  }
  if (sidebar === 1 && category === 2) {
    return sortMyListManga(sort, title, data?.manga.mangaOnHold);
  }
  if (sidebar === 1 && category === 3) {
    return sortMyListManga(sort, title, data?.manga.mangaDropped);
  }
  if (sidebar === 1 && category === 4) {
    return sortMyListManga(sort, title, data?.manga.mangaPlanToRead);
  }
  if (sidebar === 1 && category === 5) {
    return sortMyListManga(sort, title, data?.manga.mangaAll);
  }
  if (sidebar === 2 && category === 0) {
    return sortMyListManga(sort, title, data?.lightNovels.lightNovelsReading);
  }
  if (sidebar === 2 && category === 1) {
    return sortMyListManga(sort, title, data?.lightNovels.lightNovelsCompleted);
  }
  if (sidebar === 2 && category === 2) {
    return sortMyListManga(sort, title, data?.lightNovels.lightNovelsOnHold);
  }
  if (sidebar === 2 && category === 3) {
    return sortMyListManga(sort, title, data?.lightNovels.lightNovelsDropped);
  }
  if (sidebar === 2 && category === 4) {
    return sortMyListManga(
      sort,
      title,
      data?.lightNovels.lightNovelsPlanToRead,
    );
  }
  if (sidebar === 2 && category === 5) {
    return sortMyListManga(sort, title, data?.lightNovels.lightNovelsAll);
  }

  return [];
};

export const SearchTableView = (
  sidebar: any,
  category: any,
  data: any,
  filter: any,
  sort: any,
  title: any,
) => {
  const [filterType, setFilterType] = useAtom(filterTypeAtom);

  if (filter !== '') {
    return (
      // 140
      sortMySearch(
        sort,
        title,
        category,
        getFilteredTabData(category, sidebar, data),
      ).filter((media: any) => {
        return isFilteredTermOnList(media, filter, filterType);
      })
    );
  }
  if (category === 0) {
    return sortMySearch(sort, title, category, data.anime);
  }
  if (category === 1) {
    return sortMySearch(sort, title, category, data.manga);
  }
  if (category === 2) {
    return sortMySearch(sort, title, category, data.lightNovels);
  }
  if (category === 3) {
    return sortMySearch(sort, title, category, data.all);
  }

  return [];
};

export const SeasonTableView = (
  sidebar: any,
  category: any,
  data: any,
  filter: any,
  sort: any,
  title: any,
) => {
  const [filterType, setFilterType] = useAtom(filterTypeAtom);

  if (filter !== '') {
    return sortSeasons(
      sort,
      title,
      getFilteredTabData(category, sidebar, data),
    ).filter((media: any) => {
      return isFilteredTermOnList(media, filter, filterType);
    });
  }
  if (category === 0) {
    return sortSeasons(sort, title, data.TV);
  }
  if (category === 1) {
    return sortSeasons(sort, title, data.OVAONASpecial);
  }
  if (category === 2) {
    return sortSeasons(sort, title, data.Movies);
  }
  if (category === 3) {
    return sortSeasons(sort, title, data.All);
  }

  return [];
};
