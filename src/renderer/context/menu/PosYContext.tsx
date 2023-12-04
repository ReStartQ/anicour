import { ReactNode, createContext, useContext, useState } from 'react';

export const PosYContext = createContext({});

type PosYContextProviderProps = {
  children: ReactNode;
};

export const usePosY = () => {
  return useContext(PosYContext);
};

export const PosYContextProvider = ({ children }: PosYContextProviderProps) => {
  const [PosY, setPosY] = useState(0);

  return (
    <PosYContext.Provider value={{ PosY, setPosY }}>
      {children}
    </PosYContext.Provider>
  );
};
