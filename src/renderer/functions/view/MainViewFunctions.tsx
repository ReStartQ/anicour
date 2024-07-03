import { Box, Typography } from '@mui/material';
import RenderIfVisible from 'react-render-if-visible';
import MediaCard from 'renderer/components/app/main/MediaCard';
import MediaCardCompact from 'renderer/components/app/main/MediaCardCompact';
import { memo, useEffect, useMemo, useState } from 'react';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useSort } from 'renderer/context/SortContext';
import { filterTypeAtom, nextAiringEpisodeAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import { getFilteredTabData, isFilteredTermOnList } from './FilterFunctions';
import { sortMyListAnime, sortMyListManga } from '../sort/sortMainFunctions';
import { useMainMediaList } from '../MainMediaListFunctions';

// use keys for sorting
export const MainView = memo(({ view, media, index, filter, sort }: any) => {
  if (view === 0 && index <= 20) {
    return (
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index} + ${sort}` : ''
        }`}
      >
        <MediaCard props={media} key={media.titleRomaji + index} />
      </RenderIfVisible>
    );
  }
  if (view === 0) {
    return (
      <RenderIfVisible
        stayRendered
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index}` : ''
        }`}
      >
        <MediaCard props={media} key={media.titleRomaji + index} />
      </RenderIfVisible>
    );
  }
  if (view === 1 && index <= 60) {
    return (
      // 280
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index}` : ''
        }`}
      >
        <MediaCardCompact props={media} key={media.titleRomaji + index} />
      </RenderIfVisible>
    );
  }
  if (view === 1) {
    return (
      // 280
      <RenderIfVisible
        stayRendered
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index}` : ''
        }`}
      >
        <MediaCardCompact props={media} key={media.titleRomaji + index} />
      </RenderIfVisible>
    );
  }
  if (view === 2) {
    return <></>;
  }
  return <></>;
});

export const MainCategoryView = memo(
  ({ category, sidebar, mainView, filter, sort, title }: any) => {
    const myToken: any = useAniListToken();
    const myUsername: any = useAniListUsername();
    const [filterType, setFilterType] = useAtom(filterTypeAtom);
    const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
      nextAiringEpisodeAtom,
    );

    const { isLoading, isError, error, data, refetch }: any = useMainMediaList(
      myUsername.AniListUsername,
      myToken.AniListToken,
    );

    if (filter !== '' && sidebar === 0) {
      return sortMyListAnime(
        sort,
        title,
        getFilteredTabData(category, sidebar, data),
        nextAiringEpisode,
      )
        .filter((media: any) => {
          return isFilteredTermOnList(media, filter, filterType);
        })
        .map((media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              filter
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        });
    }
    if (filter !== '' && sidebar === 1) {
      return sortMyListManga(
        sort,
        title,
        getFilteredTabData(category, sidebar, data),
      )
        .filter((media: any) => {
          return isFilteredTermOnList(media, filter, filterType);
        })
        .map((media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              filter
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        });
    }
    if (filter !== '' && sidebar === 2) {
      return sortMyListManga(
        sort,
        title,
        getFilteredTabData(category, sidebar, data),
      )
        .filter((media: any) => {
          return isFilteredTermOnList(media, filter, filterType);
        })
        .map((media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              filter
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        });
    }
    if (sidebar === 0 && category === 0) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animeWatching,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 0 && category === 1) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animeCompleted,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 0 && category === 2) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animeOnHold,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 0 && category === 3) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animeDropped,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 0 && category === 4) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animePlanToWatch,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 0 && category === 5) {
      return sortMyListAnime(
        sort,
        title,
        data?.anime.animeAll,
        nextAiringEpisode,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 1 && category === 0) {
      return sortMyListManga(sort, title, data?.manga.mangaReading).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 1 && category === 1) {
      return sortMyListManga(sort, title, data?.manga.mangaCompleted).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 1 && category === 2) {
      return sortMyListManga(sort, title, data?.manga.mangaOnHold).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 1 && category === 3) {
      return sortMyListManga(sort, title, data?.manga.mangaDropped).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 1 && category === 4) {
      return sortMyListManga(sort, title, data?.manga.mangaPlanToRead).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 1 && category === 5) {
      return sortMyListManga(sort, title, data?.manga.mangaAll).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }
    if (sidebar === 2 && category === 0) {
      return sortMyListManga(
        sort,
        title,
        data?.lightNovels.lightNovelsReading,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 2 && category === 1) {
      return sortMyListManga(
        sort,
        title,
        data?.lightNovels.lightNovelsCompleted,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 2 && category === 2) {
      return sortMyListManga(
        sort,
        title,
        data?.lightNovels.lightNovelsOnHold,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 2 && category === 3) {
      return sortMyListManga(
        sort,
        title,
        data?.lightNovels.lightNovelsDropped,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 2 && category === 4) {
      return sortMyListManga(
        sort,
        title,
        data?.lightNovels.lightNovelsPlanToRead,
      ).map((media: any, index: any) => {
        return (
          <MainView
            view={mainView}
            media={media}
            index={index}
            sort={sort}
            key={media.titleRomaji + media.id}
          />
        );
      });
    }
    if (sidebar === 2 && category === 5) {
      return sortMyListManga(sort, title, data?.lightNovels.lightNovelsAll).map(
        (media: any, index: any) => {
          return (
            <MainView
              view={mainView}
              media={media}
              index={index}
              sort={sort}
              key={media.titleRomaji + media.id}
            />
          );
        },
      );
    }

    return <Box />;
  },
);
