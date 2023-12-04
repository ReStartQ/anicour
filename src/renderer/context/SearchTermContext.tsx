import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const SearchTermContext = createContext({});

type SearchTermContextProviderProps = {
  children: ReactNode;
};

export const useSearchTerm = () => {
  return useContext(SearchTermContext);
};

export const SearchTermContextProvider = ({
  children,
}: SearchTermContextProviderProps) => {
  const [SearchTerm, setSearchTerm] = useState('');

  return (
    <SearchTermContext.Provider value={{ SearchTerm, setSearchTerm }}>
      {children}
    </SearchTermContext.Provider>
  );
};
