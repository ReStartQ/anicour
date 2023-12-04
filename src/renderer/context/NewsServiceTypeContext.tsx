import { createContext, useState, useContext, ReactNode } from 'react';

type NewsContextProviderProps = {
  children: ReactNode;
};

export const NewsServiceTypeContext = createContext({});

export const useNewsServiceType = () => {
  return useContext(NewsServiceTypeContext);
};

export const NewsServiceTypeContextProvider = ({
  children,
}: NewsContextProviderProps) => {
  const [news, setNews] = useState(
    window.electron.store.get('newsServiceType') === 'MyAnimeList',
  ); // true = myanimelist, false = animenewsnetwork
  const toggleNews = () => {
    setNews(!news);
  };

  return (
    <NewsServiceTypeContext.Provider value={{ news, toggleNews }}>
      {children}
    </NewsServiceTypeContext.Provider>
  );
};
