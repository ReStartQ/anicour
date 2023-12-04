import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const NewsInfoContext = createContext({});

type NewsInfoContextProviderProps = {
  children: ReactNode;
};

export const useNewsInfo = () => {
  return useContext(NewsInfoContext);
};

export const NewsInfoContextProvider = ({
  children,
}: NewsInfoContextProviderProps) => {
  const [NewsInfo, setNewsInfo] = useState({
    title: '',
    titleURL: '',
    author: '',
    authorUrl: '',
    main: '',
    date: '',
  });

  return (
    <NewsInfoContext.Provider value={{ NewsInfo, setNewsInfo }}>
      {children}
    </NewsInfoContext.Provider>
  );
};
