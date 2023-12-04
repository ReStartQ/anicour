import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const NewsAnnContext = createContext({});

type NewsAnnContextProviderProps = {
  children: ReactNode;
};

export const useNewsAnn = () => {
  return useContext(NewsAnnContext);
};
export const NewsAnnList: any = [
  {
    title: '',
    text: '',
    link: '',
    published: '',
    category: '',
    key: 0,
  },
];

export const NewsAnnContextProvider = ({
  children,
}: NewsAnnContextProviderProps) => {
  const [NewsAnn, setNewsAnn] = useState([]);

  return (
    <NewsAnnContext.Provider value={{ NewsAnn, setNewsAnn }}>
      {children}
    </NewsAnnContext.Provider>
  );
};
