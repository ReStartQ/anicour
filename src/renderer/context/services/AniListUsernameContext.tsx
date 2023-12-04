import { createContext, useState, useContext, ReactNode } from 'react';

type AniListUsernameContextProviderProps = {
  children: ReactNode;
};

export const AniListUsernameContext = createContext({});

export const useAniListUsername = () => {
  return useContext(AniListUsernameContext);
};

export const AniListUsernameContextProvider = ({
  children,
}: AniListUsernameContextProviderProps) => {
  const [AniListUsername, setAniListUsername] = useState(
    window.electron.store.get('aniListUsername'),
  );

  return (
    <AniListUsernameContext.Provider
      value={{ AniListUsername, setAniListUsername }}
    >
      {children}
    </AniListUsernameContext.Provider>
  );
};
