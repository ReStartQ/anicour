import {
  sortByAverageScoreAscending,
  sortByAverageScoreDescending,
  sortByChaptersAscending,
  sortByChaptersDescending,
  sortByEpisodesAscending,
  sortByEpisodesDescending,
  sortByPopularityAscending,
  sortByPopularityDescending,
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
  sortByTitleDescending,
  sortByTitleAscending,
  sortByTypeAscending,
  sortByTypeDescending,
  sortByVolumeProgressAscending,
  sortByVolumeProgressDescending,
  sortByVolumesAscending,
  sortByVolumesDescending,
} from './sortFunctions';

function sortMyListAnime(sort: number, titlePreference: string, data: any) {
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
      return [...data].sort(sortByEpisodesDescending);
    case 3.5:
      return [...data].sort(sortByEpisodesAscending);
    case 4:
      return [...data].sort(sortByAverageScoreDescending);
    case 4.5:
      return [...data].sort(sortByAverageScoreAscending);
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

function sortMyListManga(sort: number, titlePreference: string, data: any) {
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
      return [...data].sort(sortByChaptersDescending);
    case 3.5:
      return [...data].sort(sortByChaptersAscending);
    case 4:
      return [...data].sort(sortByVolumesDescending);
    case 4.5:
      return [...data].sort(sortByVolumesAscending);
    case 5:
      return [...data].sort(sortByAverageScoreDescending);
    case 5.5:
      return [...data].sort(sortByAverageScoreAscending);
    case 6:
      return [...data].sort(sortByReleaseDateDescending);
    case 6.5:
      return [...data].sort(sortByReleaseDateAscending);
    default:
      return data;
  }
}
export default function sortMySearch(
  sort: number,
  titlePreference: string,
  category: number,
  data: any,
) {
  switch (category) {
    case 0:
      return sortMyListAnime(sort, titlePreference, data);
    case 1:
      return sortMyListManga(sort, titlePreference, data);
    case 2:
      return sortMyListManga(sort, titlePreference, data);
    default:
      return data;
  }
}
