import { formatType, formatTypeSort } from '../edit/formatInfo';
import { getStatusValues } from '../edit/getSortValues';
import { getTitle } from '../view/TitlePreferenceFunctions';

export function sortByStatusDescending(a: any, b: any) {
  if (getStatusValues(a.status) > getStatusValues(b.status)) return -1;
  if (getStatusValues(a.status) < getStatusValues(b.status)) return 1;
  return 0;
}

export function sortByStatusAscending(a: any, b: any) {
  if (getStatusValues(a.status) < getStatusValues(b.status)) return -1;
  if (getStatusValues(a.status) > getStatusValues(b.status)) return 1;
  return 0;
}

export function sortByTitleDescending(a: any, b: any, titlePreference: any) {
  if (titlePreference === 'Native') {
    return getTitle(titlePreference, b).localeCompare(
      getTitle(titlePreference, a),
      'ja',
    );
  }
  return getTitle(titlePreference, b).localeCompare(
    getTitle(titlePreference, a),
  );
}

export function sortByTitleAscending(a: any, b: any, titlePreference: any) {
  if (titlePreference === 'Native') {
    return getTitle(titlePreference, a).localeCompare(
      getTitle(titlePreference, b),
      'ja',
    );
  }
  return getTitle(titlePreference, a).localeCompare(
    getTitle(titlePreference, b),
  );
}

export function sortByProgressDescending(a: any, b: any) {
  return (
    b.mediaListEntry.progress - a.mediaListEntry.progress ||
    b.episodes - a.episodes
  );
}

export function sortByProgressAscending(a: any, b: any) {
  return (
    a.mediaListEntry.progress - b.mediaListEntry.progress ||
    a.episodes - b.episodes
  );
}

export function sortByVolumeProgressDescending(a: any, b: any) {
  if (a.mediaListEntry.progressVolumes > b.mediaListEntry.progressVolumes)
    return -1;
  if (a.mediaListEntry.progressVolumes < b.mediaListEntry.progressVolumes)
    return 1;
  if (a.volumes > b.volumes) return -1;
  if (a.volumes < b.volumes) return 1;
  return 0;
}

export function sortByVolumeProgressAscending(a: any, b: any) {
  if (a.mediaListEntry.progressVolumes < b.mediaListEntry.progressVolumes)
    return -1;
  if (a.mediaListEntry.progressVolumes > b.mediaListEntry.progressVolumes)
    return 1;
  if (a.volumes < b.volumes) return -1;
  if (a.volumes > b.volumes) return 1;
  return 0;
}

export function sortByEpisodesDescending(a: any, b: any) {
  if (a.episodes > b.episodes) return -1;
  if (a.episodes < b.episodes) return 1;
  return 0;
}

export function sortByEpisodesAscending(a: any, b: any) {
  if (a.episodes < b.episodes) return -1;
  if (a.episodes > b.episodes) return 1;
  return 0;
}

export function sortByChaptersDescending(a: any, b: any) {
  if (a.chapters > b.chapters) return -1;
  if (a.chapters < b.chapters) return 1;
  return 0;
}

export function sortByChaptersAscending(a: any, b: any) {
  if (a.chapters < b.chapters) return -1;
  if (a.chapters > b.chapters) return 1;
  return 0;
}

export function sortByVolumesDescending(a: any, b: any) {
  if (a.volumes > b.volumes) return -1;
  if (a.volumes < b.volumes) return 1;
  return 0;
}

export function sortByVolumesAscending(a: any, b: any) {
  if (a.volumes < b.volumes) return -1;
  if (a.volumes > b.volumes) return 1;
  return 0;
}

export function sortByScoreDescending(a: any, b: any) {
  if (a.mediaListEntry.score > b.mediaListEntry.score) return -1;
  if (a.mediaListEntry.score < b.mediaListEntry.score) return 1;
  return 0;
}

export function sortByScoreAscending(a: any, b: any) {
  if (a.mediaListEntry.score < b.mediaListEntry.score) return -1;
  if (a.mediaListEntry.score > b.mediaListEntry.score) return 1;
  return 0;
}

export function sortByAverageScoreDescending(a: any, b: any) {
  if (a.averageScore > b.averageScore) return -1;
  if (a.averageScore < b.averageScore) return 1;
  return 0;
}

export function sortByAverageScoreAscending(a: any, b: any) {
  if (a.averageScore < b.averageScore) return -1;
  if (a.averageScore > b.averageScore) return 1;
  return 0;
}

export function sortByTypeDescending(a: any, b: any) {
  if (formatTypeSort(a.format) > formatTypeSort(b.format)) return -1;
  if (formatTypeSort(a.format) < formatTypeSort(b.format)) return 1;
  return 0;
}

export function sortByTypeAscending(a: any, b: any) {
  if (formatTypeSort(a.format) < formatTypeSort(b.format)) return -1;
  if (formatTypeSort(a.format) > formatTypeSort(b.format)) return 1;
  return 0;
}

export function sortByPopularityDescending(a: any, b: any) {
  if (a.popularity > b.popularity) return -1;
  if (a.popularity < b.popularity) return 1;
  return 0;
}

export function sortByPopularityAscending(a: any, b: any) {
  if (a.popularity < b.popularity) return -1;
  if (a.popularity > b.popularity) return 1;
  return 0;
}

export function seasonValue(season: string) {
  switch (season) {
    case 'WINTER':
      return 1;
    case 'SPRING':
      return 2;
    case 'SUMMER':
      return 3;
    case 'FALL':
      return 4;
    default:
      return 0;
  }
}

export function sortBySeasonDescending(a: any, b: any) {
  console.log(a);
  if (a.seasonYear !== b.seasonYear) {
    if (a.seasonYear === null && b.seasonYear !== null)
      return b.seasonYear - a.startYear;
    if (a.seasonYear !== null && b.seasonYear === null)
      return b.startYear - a.seasonYear;
    if (a.seasonYear === null && b.seasonYear === null)
      return b.startYear - a.startYear;
    return b.seasonYear - a.seasonYear;
  }
  // in the case that seasonYear are both null
  if (a.seasonYear === null && b.seasonYear === null) {
    if (a.startYear !== b.startYear) {
      return b.startYear - a.startYear;
    }
  }
  if (seasonValue(a.season) === null || seasonValue(b.season) === null) {
    return seasonValue(a.season) === null ? -1 : 1;
  }
  return seasonValue(b.season) - seasonValue(a.season);
}

export function sortBySeasonAscending(a: any, b: any) {
  if (a.seasonYear !== b.seasonYear) {
    if (a.seasonYear === null && b.seasonYear !== null)
      return a.startYear - b.seasonYear;
    if (a.seasonYear !== null && b.seasonYear === null)
      return a.seasonYear - b.startYear;
    if (a.seasonYear === null && b.seasonYear === null)
      return a.startYear - b.startYear;
    return a.seasonYear - b.seasonYear;
  }
  // in the case that seasonYear are both null
  if (a.seasonYear === null && b.seasonYear === null) {
    if (a.startYear !== b.startYear) {
      return a.startYear - b.startYear;
    }
  }
  if (seasonValue(a.season) === null || seasonValue(b.season) === null) {
    return seasonValue(a.season) === null ? 1 : -1;
  }
  return seasonValue(a.season) - seasonValue(b.season);
}

export function sortByReleaseDateDescending(a: any, b: any) {
  if (a.startYear === null || b.startYear === null) {
    return a.startYear === null ? -1 : 1;
  }
  if (a.startYear !== b.startYear) {
    return b.startYear - a.startYear;
  }
  if (a.startMonth === null || b.startMonth === null) {
    return a.startMonth === null ? -1 : 1;
  }
  if (a.startMonth !== b.startMonth) {
    return b.startMonth - a.startMonth;
  }
  if (a.startDay === null || b.startDay === null) {
    return a.startDay === null ? -1 : 1;
  }
  return b.startDay - a.startDay;
}

export function sortByReleaseDateAscending(a: any, b: any) {
  if (a.startYear === null || b.startYear === null) {
    return a.startYear === null ? 1 : -1;
  }
  if (a.startYear !== b.startYear) {
    return a.startYear - b.startYear;
  }
  if (a.startMonth === null || b.startMonth === null) {
    return a.startMonth === null ? 1 : -1;
  }
  if (a.startMonth !== b.startMonth) {
    return a.startMonth - b.startMonth;
  }
  if (a.startDay === null || b.startDay === null) {
    return a.startDay === null ? 1 : -1;
  }
  return a.startDay - b.startDay;
}

export function sortByAiringDateDescending(a: any, b: any) {
  if (a.nextAiringEpisode === null) {
    return 1;
  }
  if (b.nextAiringEpisode === null) {
    return -1;
  }
  return (
    b.nextAiringEpisode.timeUntilAiring - a.nextAiringEpisode.timeUntilAiring
  );
}

export function sortByAiringDateAscending(a: any, b: any) {
  if (a.nextAiringEpisode === null) {
    return b.nextAiringEpisode === null ? 0 : 1;
  }
  if (b.nextAiringEpisode === null) {
    return -1;
  }
  return (
    a.nextAiringEpisode.timeUntilAiring - b.nextAiringEpisode.timeUntilAiring
  );
}
