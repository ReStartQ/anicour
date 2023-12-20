import { formatStatus } from '../edit/formatInfo';

export const getFilteredTerm = (term: any) => {
  return term
    .normalize('NFD') // breaks up diacritic marks into two parts
    .replace(/\p{Diacritic}/gu, '') // replaces diacritic marks
    .replace(/[^\p{L}\d]+/gu, '') // removes special characters
    .normalize('NFC')
    .toLowerCase();
  /*
    this is a method to remove within range
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  */
};

export const isFilteredTermOnList = (
  media: any,
  filter: any,
  filterType: any,
) => {
  if (filterType === 'All') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.titleRomaji !== null) {
      if (
        getFilteredTerm(media.titleRomaji).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.titleNative !== null) {
      if (
        getFilteredTerm(media.titleNative).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.titleEnglish !== null) {
      if (
        getFilteredTerm(media.titleEnglish).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.synonyms !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.synonyms.length; i++) {
        if (
          getFilteredTerm(media.synonyms[i]).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
    if (media.tags !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.tags.length; i++) {
        if (
          getFilteredTerm(media.tags[i].name).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
    if (media.genres !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.genres.length; i++) {
        if (
          getFilteredTerm(media.genres[i]).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
    if (media.studios !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.studios.length; i++) {
        if (
          getFilteredTerm(media.studios[i].node.name).includes(
            getFilteredTerm(filter),
          )
        ) {
          return true;
        }
      }
    }
    if (media.season !== null && media.seasonYear !== null) {
      if (
        getFilteredTerm(media.season + media.seasonYear).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
    if (media.seasonYear === null && media.startYear !== null) {
      if (
        getFilteredTerm(media.startYear.toString()).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
    if (media.status !== null) {
      if (
        getFilteredTerm(formatStatus(media.status)).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
    if (media.source !== null) {
      if (getFilteredTerm(media.source).includes(getFilteredTerm(filter))) {
        return true;
      }
    }
    if (media.format !== null) {
      if (
        getFilteredTerm(media.format).includes(getFilteredTerm(filter)) // || getFilteredTerm(`type:${media.format}`).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
  }
  if (filterType === 'Title') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.titleRomaji !== null) {
      if (
        getFilteredTerm(media.titleRomaji).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.titleNative !== null) {
      if (
        getFilteredTerm(media.titleNative).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.titleEnglish !== null) {
      if (
        getFilteredTerm(media.titleEnglish).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
    if (media.synonyms !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.synonyms.length; i++) {
        if (
          getFilteredTerm(media.synonyms[i]).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
  }
  if (filterType === 'Tags') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.tags !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.tags.length; i++) {
        if (
          getFilteredTerm(media.tags[i].name).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
  }
  if (filterType === 'Genres') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.genres !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.genres.length; i++) {
        if (
          getFilteredTerm(media.genres[i]).includes(getFilteredTerm(filter))
        ) {
          return true;
        }
      }
    }
  }
  if (filterType === 'Season/Year') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.season !== null && media.seasonYear !== null) {
      if (
        getFilteredTerm(media.season + media.seasonYear).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
    if (media.seasonYear === null && media.startYear !== null) {
      if (
        getFilteredTerm(media.startYear.toString()).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
  }
  if (filterType === 'Studio/Producer') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.studios !== null) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < media.studios.length; i++) {
        if (
          getFilteredTerm(media.studios[i].node.name).includes(
            getFilteredTerm(filter),
          )
        ) {
          return true;
        }
      }
    }
  }
  if (filterType === 'Status') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.status !== null) {
      if (
        getFilteredTerm(formatStatus(media.status)).includes(
          getFilteredTerm(filter),
        )
      ) {
        return true;
      }
    }
  }
  if (filterType === 'Source') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.source !== null) {
      if (getFilteredTerm(media.source).includes(getFilteredTerm(filter))) {
        return true;
      }
    }
  }
  if (filterType === 'Type') {
    if (getFilteredTerm(filter) === '') {
      return true;
    }
    if (media.format !== null) {
      if (
        getFilteredTerm(media.format).includes(getFilteredTerm(filter)) // || getFilteredTerm(`type:${media.format}`).includes(getFilteredTerm(filter))
      ) {
        return true;
      }
    }
  }

  // if no condition true, then false
  return false;
};

export const getFilteredTabData = (category: any, sidebar: any, data: any) => {
  // section for main: anime
  if (sidebar === 0) {
    // section for main: anime - watching
    if (category === 0) return data?.anime.animeWatching;
    // section for main: anime - completed
    if (category === 1) return data?.anime.animeCompleted;
    // section for main: anime - on hold
    if (category === 2) return data?.anime.animeOnHold;
    // section for main: anime - dropped
    if (category === 3) return data?.anime.animeDropped;
    // section for main: anime - plan to watch
    if (category === 4) return data?.anime.animePlanToWatch;
    // section for main: anime - all
    if (category === 5) return data?.anime.animeAll;
  }
  // section for main: manga
  if (sidebar === 1) {
    // section for main: manga - reading
    if (category === 0) return data?.manga.mangaReading;
    // section for main: manga - completed
    if (category === 1) return data?.manga.mangaCompleted;
    // section for main: manga - on hold
    if (category === 2) return data?.manga.mangaOnHold;
    // section for main: manga - dropped
    if (category === 3) return data?.manga.mangaDropped;
    // section for main: manga - plan to read
    if (category === 4) return data?.manga.mangaPlanToRead;
    // section for main: manga - all
    if (category === 5) return data?.manga.mangaAll;
  }
  // section for main: light novels
  if (sidebar === 2) {
    // section for main: lightNovels - reading
    if (category === 0) return data?.lightNovels.lightNovelsReading;
    // section for main: lightNovels - completed
    if (category === 1) return data?.lightNovels.lightNovelsCompleted;
    // section for main: lightNovels - on hold
    if (category === 2) return data?.lightNovels.lightNovelsOnHold;
    // section for main: lightNovels - dropped
    if (category === 3) return data?.lightNovels.lightNovelsDropped;
    // section for main: lightNovels - plan to read
    if (category === 4) return data?.lightNovels.lightNovelsPlanToRead;
    // section for main: lightNovels - all
    if (category === 5) return data?.lightNovels.lightNovelsAll;
  }
  // section for search
  if (sidebar === 3) {
    // section for search: anime
    if (category === 0) return data?.anime;
    // section for search: manga
    if (category === 1) return data?.manga;
    // section for search: light novels
    if (category === 2) return data?.lightNovels;
    // section for search: all
    if (category === 3) return data?.all;
  }
  // section for seasons
  if (sidebar === 4) {
    // section for seasons: tv
    if (category === 0) return data?.TV;
    // section for seasons: ova ona special
    if (category === 1) return data?.OVAONASpecial;
    // section for seasons: movies
    if (category === 2) return data?.Movies;
    // section for seasons: all
    if (category === 3) return data?.All;
  }
  // section for news
  if (sidebar === 5) {
    return data;
  }
  return 0;
};

export const getFilteredTabText = (category: any, sidebar: any) => {
  // section for main: anime
  if (sidebar === 0) {
    // section for main: anime - watching
    if (category === 0) return 'Watching: ';
    // section for main: anime - completed
    if (category === 1) return 'Completed: ';
    // section for main: anime - on hold
    if (category === 2) return 'On Hold: ';
    // section for main: anime - dropped
    if (category === 3) return 'Dropped: ';
    // section for main: anime - plan to watch
    if (category === 4) return 'Plan To Watch: ';
    // section for main: anime - all
    if (category === 5) return 'All: ';
  }
  // section for main: manga
  if (sidebar === 1) {
    // section for main: manga - reading
    if (category === 0) return 'Reading: ';
    // section for main: manga - completed
    if (category === 1) return 'Completed: ';
    // section for main: manga - on hold
    if (category === 2) return 'On Hold: ';
    // section for main: manga - dropped
    if (category === 3) return 'Dropped: ';
    // section for main: manga - plan to read
    if (category === 4) return 'Plan To Read: ';
    // section for main: manga - all
    if (category === 5) return 'All: ';
  }
  // section for main: light novels
  if (sidebar === 2) {
    // section for main: lightNovels - reading
    if (category === 0) return 'Reading: ';
    // section for main: lightNovels - completed
    if (category === 1) return 'Completed: ';
    // section for main: lightNovels - on hold
    if (category === 2) return 'On Hold: ';
    // section for main: lightNovels - dropped
    if (category === 3) return 'Dropped: ';
    // section for main: lightNovels - plan to read
    if (category === 4) return 'Plan To Read: ';
    // section for main: lightNovels - all
    if (category === 5) return 'All: ';
  }
  // section for search
  if (sidebar === 3) {
    // section for search: anime
    if (category === 0) return 'Anime: ';
    // section for search: manga
    if (category === 1) return 'Manga: ';
    // section for search: light novels
    if (category === 2) return 'Light Novels: ';
    // section for search: all
    if (category === 3) return 'All: ';
  }
  // section for seasons
  if (sidebar === 4) {
    // section for seasons: tv
    if (category === 0) return 'TV: ';
    // section for seasons: ova ona special
    if (category === 0) return 'OVA/ONA/Special: ';
    // section for seasons: movies
    if (category === 0) return 'Movies: ';
    // section for seasons: all
    if (category === 0) return 'All: ';
  }
  // section for news
  if (sidebar === 5) {
    return '';
  }
  return 0;
};
