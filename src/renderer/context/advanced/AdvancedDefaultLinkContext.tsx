import { createContext, useContext, useState, ReactNode } from 'react';

export const AdvancedDefaultLinkContext = createContext({});

type AdvancedDefaultLinkButtonContextProviderProps = {
  children: ReactNode;
};

export const useAdvancedDefaultLink = () => {
  return useContext(AdvancedDefaultLinkContext);
};

export const AdvancedDefaultLinkContextProvider = ({
  children,
}: AdvancedDefaultLinkButtonContextProviderProps) => {
  const [advancedDefaultLink, setAdvancedDefaultLink] = useState(
    window.electron.store.get('defaultLink'),
  );
  // values can be AniList or MyAnimeList

  return (
    <AdvancedDefaultLinkContext.Provider
      value={{ advancedDefaultLink, setAdvancedDefaultLink }}
    >
      {children}
    </AdvancedDefaultLinkContext.Provider>
  );
};
