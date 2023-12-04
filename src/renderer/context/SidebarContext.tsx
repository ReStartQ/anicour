import { createContext, useState, useContext, ReactNode } from 'react';

type SidebarButtonContextProviderProps = {
  children: ReactNode;
};

export const SidebarContext = createContext({});

export const useSidebarButton = () => {
  return useContext(SidebarContext);
};

export const SidebarContextProvider = ({
  children,
}: SidebarButtonContextProviderProps) => {
  const [sidebar, setSidebar] = useState(0);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
