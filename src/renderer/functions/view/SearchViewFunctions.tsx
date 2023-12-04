import { Box } from '@mui/material';
import SearchMediaCard from 'renderer/components/app/search/SearchMediaCard';
import SearchMediaCardCompact from 'renderer/components/app/search/SearchMediaCardCompact';
import RenderIfVisible from 'react-render-if-visible';
import { memo } from 'react';
import { getFilteredTabData, isFilteredTermOnList } from './FilterFunctions';
import sortMySearch from '../sort/sortSearchFunctions';

export const SearchView = memo(({ view, media, index, sort }: any) => {
  if (view === 0) {
    return (
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index} + ${sort}` : ''
        }`}
      >
        <SearchMediaCard props={media} key={index} />
      </RenderIfVisible>
    );
  }
  if (view === 1) {
    return (
      <RenderIfVisible
        stayRendered
        initialVisible
        key={`${media.titleRomaji + index}${
          sort !== 0 ? `-sorted + ${index} + ${sort}` : ''
        }`}
      >
        <SearchMediaCardCompact props={media} key={index} />
      </RenderIfVisible>
    );
  }
  return <></>;
});

export const SearchCategoryView = memo(
  ({ category, sidebar, data, filter, mainView, sort, title }: any) => {
    if (filter !== '') {
      return (
        // 140
        sortMySearch(
          sort,
          title,
          category,
          getFilteredTabData(category, sidebar, data),
        )
          .filter((media: any) => {
            return isFilteredTermOnList(media, filter);
          })
          .map((media: any) => {
            return (
              <SearchView
                view={mainView.view}
                media={media}
                index={media.key}
                sort={sort}
                key={media.key}
              />
            );
          })
      );
    }
    if (category === 0) {
      return sortMySearch(sort, title, category, data.anime).map(
        (media: any) => {
          return (
            <SearchView
              view={mainView.view}
              media={media}
              index={media.key}
              sort={sort}
              key={media.key}
            />
          );
        },
      );
    }
    if (category === 1) {
      return sortMySearch(sort, title, category, data.manga).map(
        (media: any) => {
          return (
            <SearchView
              view={mainView.view}
              media={media}
              index={media.key}
              sort={sort}
              key={media.key}
            />
          );
        },
      );
    }
    if (category === 2) {
      return sortMySearch(sort, title, category, data.lightNovels).map(
        (media: any) => {
          return (
            <SearchView
              view={mainView.view}
              media={media}
              index={media.key}
              sort={sort}
              key={media.key}
            />
          );
        },
      );
    }
    if (category === 3) {
      return sortMySearch(sort, title, category, data.all).map((media: any) => {
        return (
          <SearchView
            view={mainView.view}
            media={media}
            index={media.key}
            sort={sort}
            key={media.key}
          />
        );
      });
    }

    return <Box />;
  },
);
