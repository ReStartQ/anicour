import {
  sortByAiringDateAscending,
  sortByAiringDateDescending,
  sortByProgressAscending,
  sortByProgressDescending,
  sortByReleaseDateAscending,
  sortByReleaseDateDescending,
  sortByScoreAscending,
  sortByScoreDescending,
  sortBySeasonAscending,
  sortBySeasonDescending,
  sortByStatusAscending,
  sortByStatusDescending,
  sortByTitleAscending,
  sortByTitleDescending,
  sortByTypeAscending,
  sortByTypeDescending,
  sortByVolumeProgressAscending,
  sortByVolumeProgressDescending,
} from './sortFunctions';

export function sortMyListAnime(
  sort: number,
  titlePreference: string,
  data: any,
  nextAiringEpisode: string,
) {
  if (nextAiringEpisode === 'Show') {
    switch (sort) {
      case 0:
        return data;
      case 1:
        return [...data].sort(sortByAiringDateAscending);
      case 1.5:
        return [...data].sort(sortByAiringDateDescending);
      case 2:
        return [...data].sort(sortByStatusAscending);
      case 2.5:
        return [...data].sort(sortByStatusDescending);
      case 3:
        return [...data].sort((a, b) => {
          return sortByTitleDescending(a, b, titlePreference);
        });
      case 3.5:
        return [...data].sort((a, b) => {
          return sortByTitleAscending(a, b, titlePreference);
        });
      case 4:
        return [...data].sort(sortByProgressDescending);
      case 4.5:
        return [...data].sort(sortByProgressAscending);
      case 5:
        return [...data].sort(sortByScoreDescending);
      case 5.5:
        return [...data].sort(sortByScoreAscending);
      case 6:
        return [...data].sort(sortByTypeDescending);
      case 6.5:
        return [...data].sort(sortByTypeAscending);
      case 7:
        return [...data].sort(sortBySeasonDescending);
      case 7.5:
        return [...data].sort(sortBySeasonAscending);
      default:
        return data;
    }
  } else {
    switch (sort) {
      case 0:
        return data;
      case 1:
        return [...data].sort(sortByStatusAscending);
      case 1.5:
        return [...data].sort(sortByStatusDescending);
      case 2:
        return [...data].sort((a, b) => {
          return sortByTitleDescending(a, b, titlePreference);
        });
      case 2.5:
        return [...data].sort((a, b) => {
          return sortByTitleAscending(a, b, titlePreference);
        });
      case 3:
        return [...data].sort(sortByProgressDescending);
      case 3.5:
        return [...data].sort(sortByProgressAscending);
      case 4:
        return [...data].sort(sortByScoreDescending);
      case 4.5:
        return [...data].sort(sortByScoreAscending);
      case 5:
        return [...data].sort(sortByTypeDescending);
      case 5.5:
        return [...data].sort(sortByTypeAscending);
      case 6:
        return [...data].sort(sortBySeasonDescending);
      case 6.5:
        return [...data].sort(sortBySeasonAscending);
      default:
        return data;
    }
  }
}

export function sortMyListManga(
  sort: number,
  titlePreference: string,
  data: any,
) {
  switch (sort) {
    case 0:
      return data;
    case 1:
      return [...data].sort(sortByStatusAscending);
    case 1.5:
      return [...data].sort(sortByStatusDescending);
    case 2:
      return [...data].sort((a, b) => {
        return sortByTitleDescending(a, b, titlePreference);
      });
    case 2.5:
      return [...data].sort((a, b) => {
        return sortByTitleAscending(a, b, titlePreference);
      });
    case 3:
      return [...data].sort(sortByProgressDescending);
    case 3.5:
      return [...data].sort(sortByProgressAscending);
    case 4:
      return [...data].sort(sortByVolumeProgressDescending);
    case 4.5:
      return [...data].sort(sortByVolumeProgressAscending);
    case 5:
      return [...data].sort(sortByScoreDescending);
    case 5.5:
      return [...data].sort(sortByScoreAscending);
    case 6:
      return [...data].sort(sortByReleaseDateDescending);
    case 6.5:
      return [...data].sort(sortByReleaseDateAscending);
    default:
      return data;
  }
}
