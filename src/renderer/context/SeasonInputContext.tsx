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
  const standardDate = new Date();
  const earlyDate = new Date(date.setMonth(date.getMonth() + 1)); // sets 1 month after

  console.log(standardDate);
  console.log(earlyDate);

  const [seasonInput, setSeasonInput] = useState(
    getMyDate(
      window.electron.store.get('seasonChange') === 'Early'
        ? earlyDate
        : standardDate,
    ),
  );

  return (
    <SeasonInputContext.Provider value={{ seasonInput, setSeasonInput }}>
      {children}
    </SeasonInputContext.Provider>
  );
};
