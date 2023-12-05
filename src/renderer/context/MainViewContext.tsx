import { createContext, useState, useContext, ReactNode } from 'react';

type MainViewContextProviderProps = {
  children: ReactNode;
};

export const MainViewContext = createContext({});

export const useMainView = () => {
  return useContext(MainViewContext);
};

export const MainViewContextProvider = ({
  children,
}: MainViewContextProviderProps) => {
  const [view, setView] = useState(window.electron.store.get('defaultView'));

  return (
    <MainViewContext.Provider value={{ view, setView }}>
      {children}
    </MainViewContext.Provider>
  );
};
