import {
  sortByAiringDateAscending,
  sortByAiringDateDescending,
  sortByAverageScoreAscending,
  sortByAverageScoreDescending,
  sortByEpisodesAscending,
  sortByEpisodesDescending,
  sortByPopularityAscending,
  sortByPopularityDescending,
  sortByStatusAscending,
  sortByStatusDescending,
  sortByTitleAscending,
  sortByTitleDescending,
} from './sortFunctions';

export default function sortSeasons(
  sort: number,
  titlePreference: string,
  data: any,
) {
  switch (sort) {
    case 0:
      return data;
    case 1:
      return [...data].sort(sortByAiringDateAscending);
    case 1.5:
      return [...data].sort(sortByAiringDateDescending);
    case 2:
      return [...data].sort(sortByPopularityDescending);
    case 2.5:
      return [...data].sort(sortByPopularityAscending);
    case 3:
      return [...data].sort(sortByAverageScoreDescending);
    case 3.5:
      return [...data].sort(sortByAverageScoreAscending);
    case 4:
      return [...data].sort(sortByStatusAscending);
    case 4.5:
      return [...data].sort(sortByStatusDescending);
    case 5:
      return [...data].sort((a, b) => {
        return sortByTitleDescending(a, b, titlePreference);
      });
    case 5.5:
      return [...data].sort((a, b) => {
        return sortByTitleAscending(a, b, titlePreference);
      });
    case 6:
      return [...data].sort(sortByEpisodesDescending);
    case 6.5:
      return [...data].sort(sortByEpisodesAscending);
    default:
      return data;
  }
}

/*
  Next Airing Time
  Title
  Episodes
  Score
  Status
  Popularity
*/
