import { ReactNode, createContext, useContext, useState } from 'react';

export const AdvancedThemeSongsContext = createContext({});

type AdvancedThemeSongsContextProviderProps = {
  children: ReactNode;
};

export const useAdvancedThemeSongs = () => {
  return useContext(AdvancedThemeSongsContext);
};

export const AdvancedThemeSongsContextProvider = ({
  children,
}: AdvancedThemeSongsContextProviderProps) => {
  const [advancedThemeSongs, setAdvancedThemeSongs] = useState({
    openings: [],
    endings: [],
  });

  return (
    <AdvancedThemeSongsContext.Provider
      value={{ advancedThemeSongs, setAdvancedThemeSongs }}
    >
      {children}
    </AdvancedThemeSongsContext.Provider>
  );
};
