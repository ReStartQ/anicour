import { atom, createStore } from 'jotai';
import { atomWithReducer } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { getMyDate } from './functions/SeasonsFunctions';

export const myStore = createStore();

export const infoTypeAtom = atom(0);
myStore.set(infoTypeAtom, 0);

export const getInfoTypeValue = () => {
  console.log('infoTypeAtom value is changed to', myStore.get(infoTypeAtom));
};

export const newsLocationYAtom = atom(0);
myStore.set(newsLocationYAtom, 0);

const collapseStatusReducer = (prev: any, action: any) => {
  switch (action.type) {
    case 'season':
      if (prev.season) {
        // if season open
        return { season: false, sort: prev.sort };
      }
      // else open season
      return { season: true, sort: false };
    case 'sort':
      if (prev.sort) {
        // if sort open
        return { season: prev.season, sort: false };
      }
      // else open sort
      return { season: false, sort: true };
    default:
      throw new Error('unknown action type');
  }
};

export const collapseStatusReducerAtom = atomWithReducer(
  { season: false, sort: false },
  collapseStatusReducer,
);

const filterListReducer = (prev: any, action: any) => {
  switch (action.type) {
    case 'season':
      if (prev.season) {
        // if season open
        return { season: false, sort: prev.sort };
      }
      // else open season
      return { season: true, sort: false };
    case 'sort':
      if (prev.sort) {
        // if sort open
        return { season: prev.season, sort: false };
      }
      // else open sort
      return { season: false, sort: true };
    default:
      throw new Error('unknown action type');
  }
};

export const filterListReducerAtom = atomWithReducer(
  {
    anime: {
      watching: false,
      completed: false,
      onHold: false,
      dropped: false,
      planToWatch: false,
      all: true,
    },
    manga: {
      reading: false,
      completed: false,
      onHold: false,
      dropped: false,
      planToRead: false,
      all: true,
    },
    lightNovels: {
      reading: false,
      completed: false,
      onHold: false,
      dropped: false,
      planToRead: false,
      all: true,
    },
  },
  filterListReducer,
);

export const isDisabledRefreshMainAtom = atom(false);
myStore.set(isDisabledRefreshMainAtom, false);
export const isDisabledRefreshNewsAtom = atom(false);
myStore.set(isDisabledRefreshNewsAtom, false);

export const reRenderHelperAtom = atom(false);
myStore.set(reRenderHelperAtom, false);

export const searchPrevAtom = atom('');
myStore.set(searchPrevAtom, '');

const date = new Date();

export const seasonPrevAtom = atom(getMyDate(date));
myStore.set(seasonPrevAtom, getMyDate(date));

const myId = uuidv4();

export const sessionIdAtom = atom(myId);
myStore.set(sessionIdAtom, myId);

export const sessionMainIdAtom = atom(myId);
myStore.set(sessionMainIdAtom, myId);

export const sessionSearchIdAtom = atom(myId);
myStore.set(sessionSearchIdAtom, myId);

export const sessionSeasonIdAtom = atom(myId);
myStore.set(sessionSeasonIdAtom, myId);

export const isValidStartDateAtom = atom(true);
myStore.set(isValidStartDateAtom, true);

export const isValidCompleteDateAtom = atom(true);
myStore.set(isValidCompleteDateAtom, true);

// 0 = info, 1 = success + add, 2 = success - delete
export const notificationTypeAtom = atom(0);
myStore.set(notificationTypeAtom, 0);
export const notificationMediaNamesAtom = atom({
  titleRomaji: '',
  titleEnglish: '',
  titleNative: '',
});
myStore.set(notificationMediaNamesAtom, {
  titleRomaji: '',
  titleEnglish: '',
  titleNative: '',
});
export const notificationOpenAtom = atom(false);
myStore.set(notificationOpenAtom, false);
export const notificationAltOpenAtom = atom(false);
myStore.set(notificationAltOpenAtom, false);

export const statusAddSelectAtom = atom(
  window.electron.store.get('defaultAddStatus'),
);
myStore.set(statusAddSelectAtom, window.electron.store.get('defaultAddStatus'));

export const appVersionAtom = atom('0.0.0');
myStore.set(appVersionAtom, '0.0.0');

export const filterTypeAtom = atom('All');
myStore.set(filterTypeAtom, 'All');

export const seasonChangeAtom = atom(window.electron.store.get('seasonChange'));
myStore.set(seasonChangeAtom, window.electron.store.get('seasonChange'));

export const appResetDialogOpenAtom = atom(false);
myStore.set(appResetDialogOpenAtom, false);

export const notificationOpenSettingsAtom = atom(false);
export const notificationOpenAltSettingsAtom = atom(false);

export const nextAiringEpisodeAtom = atom(
  window.electron.store.get('nextAiringEpisode'),
);
myStore.set(
  nextAiringEpisodeAtom,
  window.electron.store.get('nextAiringEpisode'),
);

export const defaultSeasonSortAtom = atom(
  window.electron.store.get('defaultSeasonSort'),
);
myStore.set(
  defaultSeasonSortAtom,
  window.electron.store.get('defaultSeasonSort'),
);
