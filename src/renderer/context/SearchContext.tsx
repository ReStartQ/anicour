import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const SearchContext = createContext({});

type SearchContextProviderProps = {
  children: ReactNode;
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [Search, setSearch] = useState([]);

  return (
    <SearchContext.Provider value={{ Search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
