import { createContext, useState, useContext, ReactNode } from 'react';

type AniListTokenContextProviderProps = {
  children: ReactNode;
};

export const AniListTokenContext = createContext({});

export const useAniListToken = () => {
  return useContext(AniListTokenContext);
};

export const AniListTokenContextProvider = ({
  children,
}: AniListTokenContextProviderProps) => {
  const [AniListToken, setAniListToken] = useState(
    window.electron.store.get('aniListToken'),
  );

  return (
    <AniListTokenContext.Provider value={{ AniListToken, setAniListToken }}>
      {children}
    </AniListTokenContext.Provider>
  );
};
