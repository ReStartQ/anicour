import { createContext, useState, useContext, ReactNode } from 'react';

type SortContextProviderProps = {
  children: ReactNode;
};

export const SortContext = createContext({});

export const useSort = () => {
  return useContext(SortContext);
};

export const SortContextProvider = ({ children }: SortContextProviderProps) => {
  const [sort, setSort] = useState(0);

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};
