import { ReactNode, createContext, useContext, useState } from 'react';

export const AdvancedMoreInfoContext = createContext({});

type AdvancedMoreInfoContextProviderProps = {
  children: ReactNode;
};

export const useAdvancedMoreInfo = () => {
  return useContext(AdvancedMoreInfoContext);
};

export const AdvancedMoreInfoContextProvider = ({
  children,
}: AdvancedMoreInfoContextProviderProps) => {
  const [advancedMoreInfo, setAdvancedMoreInfo] = useState(false);

  return (
    <AdvancedMoreInfoContext.Provider
      value={{ advancedMoreInfo, setAdvancedMoreInfo }}
    >
      {children}
    </AdvancedMoreInfoContext.Provider>
  );
};
