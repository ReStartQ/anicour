import { createContext, useState, useContext, ReactNode } from 'react';

type TitleContextProviderProps = {
  children: ReactNode;
};

export const TitleContext = createContext({});

export const useTitle = () => {
  return useContext(TitleContext);
};

export const TitleContextProvider = ({
  children,
}: TitleContextProviderProps) => {
  const [title, setTitle] = useState(
    window.electron.store.get('titlePreference'),
  );

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
