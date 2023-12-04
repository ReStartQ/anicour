import { createContext, useState, useContext, ReactNode } from 'react';

type NewsContextProviderProps = {
  children: ReactNode;
};

export const NewsAdvContext = createContext({});

export const useNewsAdv = () => {
  return useContext(NewsAdvContext);
};

export const NewsAdvContextProvider = ({
  children,
}: NewsContextProviderProps) => {
  const [news, setNews] = useState(true);

  const toggleNews = () => {
    setNews(!news);
  };

  return (
    <NewsAdvContext.Provider value={{ news, toggleNews }}>
      {children}
    </NewsAdvContext.Provider>
  );
};
