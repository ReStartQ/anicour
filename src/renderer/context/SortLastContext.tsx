import {
  createContext,
  useState,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

type SortLastContextProviderProps = {
  children: ReactNode;
};

const defaultSortLast = {
  anime: 0,
  manga: 0,
  lightNovels: 0,
  searchAnime: 0,
  searchManga: 0,
  searchLightNovels: 0,
  seasons: 0,
};

export const SortLastContext = createContext({});

export const useSortLast = () => {
  return useContext(SortLastContext);
};

export const SortLastContextReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateAnimeSort':
      return {
        ...state,
        anime: action.payload,
      };
    case 'updateMangaSort':
      return {
        ...state,
        manga: action.payload,
      };
    case 'updateLightNovelsSort':
      return {
        ...state,
        lightNovels: action.payload,
      };
    case 'updateSearchAnimeSort':
      return {
        ...state,
        searchAnime: action.payload,
      };
    case 'updateSearchMangaSort':
      return {
        ...state,
        searchManga: action.payload,
      };
    case 'updateSearchLightNovelsSort':
      return {
        ...state,
        searchLightNovels: action.payload,
      };
    case 'updateSeasonsSort':
      return {
        ...state,
        seasons: action.payload,
      };
    default:
      return state;
  }
};

export const SortLastContextProvider = ({
  children,
}: SortLastContextProviderProps) => {
  const [sortLast, dispatch] = useReducer(
    SortLastContextReducer,
    defaultSortLast,
  );

  return (
    <SortLastContext.Provider value={{ sortLast, dispatch }}>
      {children}
    </SortLastContext.Provider>
  );
};
