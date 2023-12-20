import SeasonMediaCardCompact from 'renderer/components/app/seasons/SeasonMediaCardCompact';
import { SeasonMediaCard } from 'renderer/components/app/seasons/SeasonMediaCard';
import { Box } from '@mui/material';
import { memo } from 'react';
import RenderIfVisible from 'react-render-if-visible';
import { useAtom } from 'jotai';
import { filterTypeAtom } from 'renderer/store';
import { getFilteredTabData, isFilteredTermOnList } from './FilterFunctions';
import sortSeasons from '../sort/sortSeasonsFunctions';

export const SeasonView = memo(({ view, media, index, sort }: any) => {
  if (view === 0) {
    return (
      // 140
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index} + ${sort}` : ''
        }`}
      >
        <SeasonMediaCard props={media} key={index} />
      </RenderIfVisible>
    );
  }
  if (view === 1) {
    return (
      // 280
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index} + ${sort}` : ''
        }`}
      >
        <SeasonMediaCardCompact props={media} key={index} />
      </RenderIfVisible>
    );
  }
  return <></>;
});

export const SeasonCategoryView = memo(
  ({ category, sidebar, data, filter, mainView, sort, title }: any) => {
    const [filterType, setFilterType] = useAtom(filterTypeAtom);

    if (filter !== '') {
      return sortSeasons(
        sort,
        title,
        getFilteredTabData(category, sidebar, data),
      )
        .filter((media: any) => {
          return isFilteredTermOnList(media, filter, filterType);
        })
        .map((media: any) => {
          return (
            <SeasonView
              view={mainView.view}
              media={media}
              index={media.key}
              sort={sort}
              key={media.key}
            />
          );
        });
    }
    if (category === 0) {
      return sortSeasons(sort, title, data.TV).map((media: any) => {
        return (
          <SeasonView
            view={mainView.view}
            media={media}
            index={media.key}
            sort={sort}
            key={media.key}
          />
        );
      });
    }
    if (category === 1) {
      return sortSeasons(sort, title, data.OVAONASpecial).map((media: any) => {
        return (
          <SeasonView
            view={mainView.view}
            media={media}
            index={media.key}
            sort={sort}
            key={media.key}
          />
        );
      });
    }
    if (category === 2) {
      return sortSeasons(sort, title, data.Movies).map((media: any) => {
        return (
          <SeasonView
            view={mainView.view}
            media={media}
            index={media.key}
            sort={sort}
            key={media.key}
          />
        );
      });
    }
    if (category === 3) {
      return sortSeasons(sort, title, data.All).map((media: any) => {
        return (
          <SeasonView
            view={mainView.view}
            media={media}
            index={media.key}
            sort={sort}
            key={media.key}
          />
        );
      });
    }

    // { TV: [], OVAONASpecial: [], Movies: [], All: [] }
    return <Box />;
  },
);
