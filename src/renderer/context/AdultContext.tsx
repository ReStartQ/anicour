import { createContext, useState, useContext, ReactNode } from 'react';

type AdultContextProviderProps = {
  children: ReactNode;
};

export const AdultContext = createContext({});

export const useAdult = () => {
  return useContext(AdultContext);
};

export const AdultContextProvider = ({
  children,
}: AdultContextProviderProps) => {
  const [adult, setAdult] = useState(window.electron.store.get('isAdult'));

  return (
    <AdultContext.Provider value={{ adult, setAdult }}>
      {children}
    </AdultContext.Provider>
  );
};
