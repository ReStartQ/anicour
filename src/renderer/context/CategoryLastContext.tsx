import {
  createContext,
  useState,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

type CategoryLastContextProviderProps = {
  children: ReactNode;
};

const defaultCategoryLast = {
  anime: 0,
  manga: 0,
  lightNovels: 0,
  search: 0,
  seasons: 0,
};

export const CategoryLastContext = createContext({});

export const useCategoryLast = () => {
  return useContext(CategoryLastContext);
};

export const CategoryLastContextReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateAnimeCategory':
      return {
        ...state,
        anime: action.payload,
      };
    case 'updateMangaCategory':
      return {
        ...state,
        manga: action.payload,
      };
    case 'updateLightNovelsCategory':
      return {
        ...state,
        lightNovels: action.payload,
      };
    case 'updateSearchCategory':
      return {
        ...state,
        search: action.payload,
      };
    case 'updateSeasonsCategory':
      return {
        ...state,
        seasons: action.payload,
      };
    default:
      return state;
  }
};

export const CategoryLastContextProvider = ({
  children,
}: CategoryLastContextProviderProps) => {
  const [categoryLast, dispatch] = useReducer(
    CategoryLastContextReducer,
    defaultCategoryLast,
  );

  return (
    <CategoryLastContext.Provider value={{ categoryLast, dispatch }}>
      {children}
    </CategoryLastContext.Provider>
  );
};
