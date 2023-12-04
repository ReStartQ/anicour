import {
  createContext,
  useState,
  useReducer,
  useContext,
  ReactNode,
} from 'react';

const defaultMedia = {
  id: -1,
  idMal: null, // 10000
  advancedMediaRomaji: 'N/A',
  advancedMediaEnglish: 'N/A',
  advancedMediaNative: 'N/A',
  synonyms: ['N/A'],
  season: 'WINTER',
  seasonYear: 2023,
  episodes: 1,
  chapters: 1,
  volumes: 1,
  type: 'ANIME',
  format: 'TV',
  image: '',
  imageMedium: '',
  imageExtraLarge: '',
  bannerImage: '',
  startYear: 1997,
  startMonth: 2,
  startDay: 27,
  description: '',
  genres: ['Mystery'],
  tags: [{ name: 'Mystery' }],
  status: 'RELEASING',
  siteUrl: '',
  duration: 24,
  averageScore: 10,
  popularity: 1000,
  studios: [{ isMain: true, node: { name: 'yes' } }],
  mainStudioIndex: -1,
  source: 'Original',
  meanScore: '10',
  mediaListEntry: null,
  progress: 0,
  progressVolumes: 0,
  score: 0,
  notes: '',
  startedAt: { year: 2023, month: 4, day: 12 },
  completedAt: { year: 2023, month: 4, day: 12 },
  repeat: 0,
  trailer: { site: 'youtube', id: '', thumbnail: '' },
  nextAiringEpisode: null,
  location: 'animeCompleted',
  key: `N/A${322}`,
};

type AdvancedMediaContextProviderProps = {
  children: ReactNode;
};

export const AdvancedMediaContext = createContext({});

export const useAdvancedMedia = () => {
  return useContext(AdvancedMediaContext);
};

export const AdvancedMediaContextReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'getNewMedia':
      return action.payload;
    case 'updateMediaListEntry':
      return {
        ...state,
        mediaListEntry: action.payload,
      };
    case 'updateProgress':
      return {
        ...state,
        mediaListEntry: { ...state.mediaListEntry, progress: action.payload },
      };
    case 'updateProgressVolumes':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          progressVolumes: action.payload,
        },
      };
    case 'updateRepeat':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          repeat: action.payload,
        },
      };
    case 'updateStatus':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          status: action.payload,
        },
      };
    case 'updateScore':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          score: action.payload,
        },
      };
    case 'updateNotes':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          notes: action.payload,
        },
      };
    case 'updateStartedAt':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          startedAt: action.payload,
        },
      };
    case 'updateCompletedAt':
      return {
        ...state,
        mediaListEntry: {
          ...state.mediaListEntry,
          completedAt: action.payload,
        },
      };
    default:
      return state;
  }
};

export const AdvancedMediaContextProvider = ({
  children,
}: AdvancedMediaContextProviderProps) => {
  // window.electron.store.get('advancedMedia')
  const [advancedMedia, dispatch] = useReducer(
    AdvancedMediaContextReducer,
    defaultMedia,
  );

  return (
    <AdvancedMediaContext.Provider value={{ advancedMedia, dispatch }}>
      {children}
    </AdvancedMediaContext.Provider>
  );
};
