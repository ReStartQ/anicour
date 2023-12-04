import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export const FilterContext = createContext({});

type FilterContextProviderProps = {
  children: ReactNode;
};

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterContextProvider = ({
  children,
}: FilterContextProviderProps) => {
  const [filter, setFilter] = useState('');
  const value = useMemo(() => {
    return { filter, setFilter };
  }, [filter]);

  return (
    <FilterContext.Provider
      value={{ filter: value.filter, setFilter: value.setFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};
