import { ReactNode, createContext, useContext, useState } from 'react';

export const ShowMenuContext = createContext({});

type ShowMenuContextProviderProps = {
  children: ReactNode;
};

export const useShowMenu = () => {
  return useContext(ShowMenuContext);
};

export const ShowMenuContextProvider = ({
  children,
}: ShowMenuContextProviderProps) => {
  const [ShowMenu, setShowMenu] = useState(false);

  return (
    <ShowMenuContext.Provider value={{ ShowMenu, setShowMenu }}>
      {children}
    </ShowMenuContext.Provider>
  );
};
