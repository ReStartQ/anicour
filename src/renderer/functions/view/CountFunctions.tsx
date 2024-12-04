import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useAtom } from 'jotai';
import { filterTypeAtom } from 'renderer/store';
import { isFilteredTermOnList } from './FilterFunctions';

export const MainCount = memo(({ sidebar, category, data }: any) => {
  if (sidebar === 0 && category === 0) {
    return (
      <Typography fontSize={11}>{data.anime.animeWatching.length}</Typography>
    );
  }
  if (sidebar === 0 && category === 1) {
    return (
      <Typography fontSize={11}>{data.anime.animeCompleted.length}</Typography>
    );
  }
  if (sidebar === 0 && category === 2) {
    return (
      <Typography fontSize={11}>{data.anime.animeOnHold.length}</Typography>
    );
  }
  if (sidebar === 0 && category === 3) {
    return (
      <Typography fontSize={11}>{data.anime.animeDropped.length}</Typography>
    );
  }
  if (sidebar === 0 && category === 4) {
    return (
      <Typography fontSize={11}>
        {data.anime.animePlanToWatch.length}
      </Typography>
    );
  }
  if (sidebar === 0 && category === 5) {
    return <Typography fontSize={11}>{data.anime.animeAll.length}</Typography>;
  }
  if (sidebar === 1 && category === 0) {
    return (
      <Typography fontSize={11}>{data.manga.mangaReading.length}</Typography>
    );
  }
  if (sidebar === 1 && category === 1) {
    return (
      <Typography fontSize={11}>{data.manga.mangaCompleted.length}</Typography>
    );
  }
  if (sidebar === 1 && category === 2) {
    return (
      <Typography fontSize={11}>{data.manga.mangaOnHold.length}</Typography>
    );
  }
  if (sidebar === 1 && category === 3) {
    return (
      <Typography fontSize={11}>{data.manga.mangaDropped.length}</Typography>
    );
  }
  if (sidebar === 1 && category === 4) {
    return (
      <Typography fontSize={11}>{data.manga.mangaPlanToRead.length}</Typography>
    );
  }
  if (sidebar === 1 && category === 5) {
    return <Typography fontSize={11}>{data.manga.mangaAll.length}</Typography>;
  }
  if (sidebar === 2 && category === 0) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsReading.length}
      </Typography>
    );
  }
  if (sidebar === 2 && category === 1) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsCompleted.length}
      </Typography>
    );
  }
  if (sidebar === 2 && category === 2) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsOnHold.length}
      </Typography>
    );
  }
  if (sidebar === 2 && category === 3) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsDropped.length}
      </Typography>
    );
  }
  if (sidebar === 2 && category === 4) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsPlanToRead.length}
      </Typography>
    );
  }
  if (sidebar === 2 && category === 5) {
    return (
      <Typography fontSize={11}>
        {data.lightNovels.lightNovelsAll.length}
      </Typography>
    );
  }
  return <Typography fontSize={11}>0</Typography>;
});

export const FilterCount = memo(
  ({ sidebar, category, data, filterTerm }: any) => {
    const [filterType, setFilterType] = useAtom(filterTypeAtom);

    const formatCount = (count: number) => {
      return count > 9999 ? '9999+' : count;
    };

    // main count - anime
    if (sidebar === 0) {
      if (category === 0)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animeWatching.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 1)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animeCompleted.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 2)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animeOnHold.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 3)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animeDropped.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );

      if (category === 4)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animePlanToWatch.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 5)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.animeAll.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
    }
    // main count - manga
    if (sidebar === 1) {
      if (category === 0)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaReading.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 1)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaCompleted.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 2)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaOnHold.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 3)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaDropped.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 4)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaPlanToRead.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 5)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.mangaAll.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
    }
    // main count - lightNovels
    if (sidebar === 2) {
      if (category === 0)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsReading.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 1)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsCompleted.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 2)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsOnHold.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 3)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsDropped.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 4)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsPlanToRead.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 5)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.lightNovelsAll.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
    }
    // search count
    if (sidebar === 3) {
      if (category === 0)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.anime.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 1)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.manga.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 2)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.lightNovels.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 3)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.all.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
    }
    // seasons count
    if (sidebar === 4) {
      if (category === 0)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.TV.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 1)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.OVAONASpecial.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 2)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.Movies.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
      if (category === 4)
        return (
          <Typography fontSize={12}>
            {formatCount(
              data.All.filter((media: any) => {
                return isFilteredTermOnList(media, filterTerm, filterType);
              }).length,
            )}
          </Typography>
        );
    }
    return <Typography fontSize={12}>0</Typography>;
  },
);
