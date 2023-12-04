import { ReactNode, createContext, useContext, useState } from 'react';

export const PosXContext = createContext({});

type PosXContextProviderProps = {
  children: ReactNode;
};

export const usePosX = () => {
  return useContext(PosXContext);
};

export const PosXContextProvider = ({ children }: PosXContextProviderProps) => {
  const [PosX, setPosX] = useState(0);

  return (
    <PosXContext.Provider value={{ PosX, setPosX }}>
      {children}
    </PosXContext.Provider>
  );
};
