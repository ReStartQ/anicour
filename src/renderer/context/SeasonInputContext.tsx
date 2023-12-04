import { createContext, useState, useContext, ReactNode } from 'react';
import { getMyDate } from 'renderer/functions/SeasonsFunctions';

type SeasonInputButtonContextProviderProps = {
  children: ReactNode;
};

export const SeasonInputContext = createContext({});

export const useSeasonInput = () => {
  return useContext(SeasonInputContext);
};

export const SeasonInputContextProvider = ({
  children,
}: SeasonInputButtonContextProviderProps) => {
  const date = new Date();

  const [seasonInput, setSeasonInput] = useState(getMyDate(date));

  return (
    <SeasonInputContext.Provider value={{ seasonInput, setSeasonInput }}>
      {children}
    </SeasonInputContext.Provider>
  );
};
