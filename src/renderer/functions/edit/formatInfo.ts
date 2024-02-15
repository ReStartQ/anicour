export function formatSeason(season: string, seasonYear: any) {
  if (season === null || seasonYear === null) {
    return '?';
  }
  return `${
    season[0].toUpperCase() + season.slice(1).toLowerCase()
  } ${seasonYear}`;
}

export function formatStartYear(startYear: number) {
  if (startYear === null) {
    return '?';
  }
  return `${startYear}`;
}

export function formatType(type: string | null) {
  switch (type) {
    case 'TV':
      return type;
    case 'TV_SHORT':
      return 'TV Short';
    case 'MOVIE':
      return 'Movie';
    case 'SPECIAL':
      return 'Special';
    case 'OVA':
      return type;
    case 'ONA':
      return type;
    case 'MUSIC':
      return 'Music';
    case 'MANGA':
      return 'Manga';
    case 'NOVEL':
      return 'Light Novel';
    case 'ONE_SHOT':
      return 'One-Shot';
    case null:
      return '?';
    default:
      return type;
  }
}

export function formatTypeSort(type: string | null) {
  switch (type) {
    case 'TV':
      return 'TV Show';
    case 'TV_SHORT':
      return 'TV Short';
    case 'MOVIE':
      return 'Movie';
    case 'SPECIAL':
      return 'Special';
    case 'OVA':
      return type;
    case 'ONA':
      return type;
    case 'MUSIC':
      return 'Music';
    case 'MANGA':
      return 'Manga';
    case 'NOVEL':
      return 'Light Novel';
    case 'ONE_SHOT':
      return 'One-Shot';
    case null:
      return '?';
    default:
      return type;
  }
}

export function formatSource(source: string | null) {
  switch (source) {
    case 'ORIGINAL':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'MANGA':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'LIGHT_NOVEL':
      return 'Light Novel';
    case 'VISUAL_NOVEL':
      return 'Visual Novel';
    case 'VIDEO_GAME':
      return 'Video Game';
    case 'OTHER':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'NOVEL':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'DOUJINSHI':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'ANIME':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'WEB_NOVEL':
      return 'Web Novel';
    case 'LIVE_ACTION':
      return 'Live Action';
    case 'GAME':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'COMIC                  ':
      return source[0].toUpperCase() + source.slice(1).toLowerCase();
    case 'MULTIMEDIA_PROJECT':
      return 'Multimedia Project';
    case 'PICTURE_BOOK':
      return 'Picture Book';
    case null:
      return '?';
    default:
      return source;
  }
}

export function formatStatus(status: string | null) {
  switch (status) {
    case 'FINISHED': // 2
      return status[0].toUpperCase() + status.slice(1).toLowerCase();
    case 'RELEASING': // 5
      return status[0].toUpperCase() + status.slice(1).toLowerCase();
    case 'NOT_YET_RELEASED': // 4
      return 'Not yet released';
    case 'CANCELLED': // 1
      return status[0].toUpperCase() + status.slice(1).toLowerCase();
    case 'HIATUS': // 3
      return status[0].toUpperCase() + status.slice(1).toLowerCase();
    case null:
      return '?';
    default:
      return status;
  }
}

export function formatMonth(month: any) {
  switch (month) {
    case 1:
      // January
      return 'Jan';
    case 2:
      // February
      return 'Feb';
    case 3:
      // March
      return 'Mar';
    case 4:
      // April
      return 'Apr';
    case 5:
      // May
      return 'May';
    case 6:
      // June
      return 'Jun';
    case 7:
      // July
      return 'Jul';
    case 8:
      // August
      return 'Aug';
    case 9:
      // September
      return 'Sept';
    case 10:
      // October
      return 'Oct';
    case 11:
      // November
      return 'Nov';
    case 12:
      // December
      return 'Dec';
    default:
      return '?';
  }
}
export function formatReleaseDate(day: any, month: any, year: any) {
  if (day === null && month === null && year === null) {
    return '?';
  }
  if ((day === null || month === null) && year !== null) {
    return `${year}`;
  }
  return `${month !== null ? formatMonth(month) : '?'} ${
    day !== null ? day : '?'
  }, ${year !== null ? year : '?'}`;
}

export function formatReleaseDateNumbers(day: any, month: any, year: any) {
  if (day === null && month === null && year === null) {
    return '?';
  }
  if ((day === null || month === null) && year !== null) {
    return `${year}`;
  }
  return `${month !== null ? month : '?'}/${day !== null ? day : '?'}/${
    year !== null ? year : '?'
  }`;
}

export function formatProgress(
  type: any,
  progress: any,
  episodes: any,
  chapters: any,
) {
  if (type === 'ANIME') {
    if (progress < 1000) {
      // 3 + 2
      return `${progress} / ${episodes !== null ? episodes : '?'}`;
    }
    if (progress >= 1000 && episodes === null) {
      return `${progress} / ${episodes !== null ? episodes : '?'}`;
    }
    return `${progress}/${episodes}`;
  }
  if (progress < 1000) {
    return `${progress} / ${chapters !== null ? chapters : '?'}`;
  }
  if (progress >= 1000 && chapters === null) {
    return `${progress} / ${chapters !== null ? chapters : '?'}`;
  }
  return `${progress}/${chapters}`;
}

export function formatProgressVolumes(progressVolumes: any, volumes: any) {
  if (progressVolumes < 1000) {
    return `${progressVolumes} / ${volumes !== null ? volumes : '?'}`;
  }
  if (progressVolumes >= 1000 && volumes === null) {
    return `${progressVolumes} / ${volumes !== null ? volumes : '?'}`;
  }

  return `${progressVolumes}/${volumes}`;
}

export function formatSaveMediaListEntryForAdvanced(mediaListEntry: any) {
  return {
    completedAt: mediaListEntry.completedAt,
    mediaId: mediaListEntry.id,
    notes: mediaListEntry.notes,
    progress: mediaListEntry.progress,
    progressVolumes: mediaListEntry.progressVolumes,
    repeat: mediaListEntry.repeat,
    score: mediaListEntry.score,
    startedAt: mediaListEntry.startedAt, // today's date
    status: mediaListEntry.status, // where you want to put it
    private: mediaListEntry.private, // default is false
  };
}

export function getShortDate() {
  return 0;
}

export function getLongDate() {
  return 0;
}
