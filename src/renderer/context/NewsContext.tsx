import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const NewsContext = createContext({});

type NewsContextProviderProps = {
  children: ReactNode;
};

export const useNews = () => {
  return useContext(NewsContext);
};
export const NewsList: any = [
  {
    title: '',
    text: '',
    link: '',
    published: '',
    category: '',
    key: 0,
  },
];

export const NewsContextProvider = ({ children }: NewsContextProviderProps) => {
  const [News, setNews] = useState([]);

  return (
    <NewsContext.Provider value={{ News, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
